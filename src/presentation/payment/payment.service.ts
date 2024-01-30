import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'
import { envs } from '../../config/envs'
import Stripe from 'stripe'

import type { CreatePayment } from '../../types/payment.types'

const shippingMethods = [
  { CORREOS_CHILE: 4000 },
  { CHILEXPRESS: 5000 },
  { SHOP_PICKUP: 0 },
  { STARKEN: 4500 }
]

const stripe = new Stripe(envs.STRIPE_SECRET_KEY)

export class PaymentService {
  async createCheckoutSession ({
    orderId, productsCart, shippingMethod, userId
  }: CreatePayment): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          cart: true
        }
      })
      if (user == null) throw CustomError.badRequest('User not found')

      const lineItems = []
      let total: number = 0

      for (const item of productsCart) {
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
            orderId,
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

      const shippingCost: number | undefined = shippingMethods.find(method => method[shippingMethod])?.[shippingMethod]
      if (shippingCost === undefined) throw CustomError.badRequest('Shipping cost not found')
      total += shippingCost

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${envs.CLIENT_URL}/payment/success`,
        cancel_url: `${envs.CLIENT_URL}/payment/cancel`
      })

      if (session == null) throw CustomError.badRequest('Error creating session')

      const order = await prisma.order.create({
        data: {
          userId,
          shippingMethod,
          addressId: 1,
          paid: false,
          checkoutSessionId: session.id,
          payment: {
            create: {
              amount: total,
              currency: 'clp',
              status: 'PENDING'
            }
          }
        }
      })
      if (order == null) throw CustomError.badRequest('Error creating order')
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
