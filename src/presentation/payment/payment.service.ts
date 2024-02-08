import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'
import { envs } from '../../config/envs'
import Stripe from 'stripe'

import type { CreatePayment } from '../../types/payment.types'

const stripe = new Stripe(envs.STRIPE_SECRET_KEY)

export class PaymentService {
  async createCheckoutSession ({
    shippingMethod, authId
  }: CreatePayment): Promise<string> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          authId
        },
        include: {
          cart: true,
          address: true
        }
      })
      if (user == null) throw CustomError.badRequest('User not found')
      if (user.address == null) throw CustomError.badRequest('User address not found')

      const lineItems = []
      let total: number = 0

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          shippingMethod,
          addressId: 1,
          paid: false,
          payment: {
            create: {
              amount: total,
              currency: 'clp',
              status: 'PENDING'
            }
          }
        }
      })

      const cart = await prisma.cart.findUnique({
        where: {
          userId: user.id
        },
        include: {
          products: true
        }
      })
      if (cart == null) throw CustomError.badRequest('Cart not found')

      for (const item of cart.products) {
        const product = await prisma.product.findUnique({
          where: {
            id: item.productId
          },
          include: {
            options: true
          }
        })
        if (product == null) {
          throw CustomError.badRequest('Product not found')
        }

        total += product.options[item.optionSelectedIndex].price * item.quantity

        let price = product.options[item.optionSelectedIndex].price
        if (product.options[item.optionSelectedIndex].discount > 0) {
          const discount = product.options[item.optionSelectedIndex].discount
          price = price - (price * (discount / 100))
        }

        lineItems.push({
          price_data: {
            currency: 'clp',
            product_data: {
              name: product.name + ' ' + product.options[item.optionSelectedIndex].name,
              description: product.miniDesc
            },
            unit_amount: price
          },
          quantity: item.quantity
        })

        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            quantity: item.quantity,
            productId: item.productId,
            productName: product.name,
            productImage: product.images[0],
            productDescription: product.miniDesc,
            optionSelectedIndex: item.optionSelectedIndex,
            productPrice: product.options[item.optionSelectedIndex].price
          }
        })
      }

      const shippingMethods = [
        { CORREOS_CHILE: 4000 },
        { CHILEXPRESS: 5000 },
        { SHOP_PICKUP: 0 },
        { STARKEN: 4500 }
      ]

      total += shippingMethods.find(method => method[shippingMethod])?.[shippingMethod] ?? 0

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${envs.CLIENT_URL}/payment/success`,
        cancel_url: `${envs.CLIENT_URL}/payment/cancel`
      })

      if (session == null) throw CustomError.badRequest('Error creating session')
      if (session.url == null) throw CustomError.badRequest('Error creating session')

      await prisma.order.update({
        where: {
          id: order.id
        },
        data: {
          payment: {
            update: {
              amount: total,
              stripeSessionId: session.id
            }
          }
        }
      })

      await prisma.cart.update({
        where: {
          userId: user.id
        },
        data: {
          products: {
            deleteMany: {}
          }
        }
      })

      return session.url
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async stripeWebhook (event: Stripe.Event): Promise<{ received: boolean }> {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      const order = await prisma.order.findFirst({
        where: {
          checkoutSessionId: session.id
        },
        include: {
          items: true
        }
      })
      if (order == null) throw CustomError.badRequest('Order not found')

      for (const item of order.items) {
        const product = await prisma.product.findUnique({
          where: {
            id: item.productId
          },
          include: {
            options: true
          }
        })
        if (product == null) throw CustomError.badRequest('Product not found')

        await prisma.option.update({
          where: {
            id: product.options[item.optionSelectedIndex].id
          },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }

      await prisma.order.update({
        where: {
          id: order.id
        },
        data: {
          paid: true
        }
      })
    }

    return {
      received: true
    }
  }
}
