import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'

import type { AddProductToCart, Cart } from '../../types/cart.types'

export class CartService {
  async createCart (authId: string): Promise<string> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const user = await prismaClient.user.findUnique({
          where: {
            authId
          }
        })
        if (user === null) throw CustomError.notFound('User not found')

        await prismaClient.cart.create({
          data: {
            userId: user.id
          }
        })
      })

      return 'Cart created successfully'
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getCart (authId: string): Promise<Cart> {
    try {
      const cart = await prisma.$transaction(async (prismaClient) => {
        const user = await prisma.user.findUnique({
          where: {
            authId
          }
        })
        const cart = await prisma.cart.findFirst({
          where: {
            userId: user?.id
          },
          include: {
            products: {
              include: {
                product: {
                  include: {
                    options: true
                  }
                }
              }
            }
          }
        })
        if (cart === null) throw CustomError.notFound('Cart not found')

        return cart
      })

      return cart
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async addProductToCart ({
    optionSelectedIndex, productId, quantity, authId
  }: AddProductToCart): Promise<void> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const user = await prismaClient.user.findUnique({
          where: {
            authId
          }
        })
        if (user === null) throw CustomError.notFound('User not found')

        const cart = await prismaClient.cart.findUnique({
          where: {
            userId: user.id
          }
        })
        if (cart === null) throw CustomError.notFound('Cart not found')

        const product = await prismaClient.product.findUnique({
          where: {
            id: productId
          },
          include: {
            options: true
          }
        })

        if (product === null) throw CustomError.notFound('Product not found')

        if (product.options[optionSelectedIndex].stock === 0) {
          throw CustomError.badRequest('Option not available')
        }

        if (product.options[optionSelectedIndex].stock < quantity) {
          throw CustomError.badRequest('Not enough stock')
        }

        const productCart = await prismaClient.productCart.findFirst({
          where: {
            productId,
            cartId: cart.id
          }
        })

        if (productCart !== null) {
          await prismaClient.productCart.update({
            where: {
              id: productCart.id
            },
            data: {
              quantity: productCart.quantity + quantity
            }
          })
          return
        }

        await prismaClient.productCart.create({
          data: {
            quantity,
            productId,
            cartId: cart.id,
            optionSelectedIndex
          }
        })
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async removeProductFromCart (authId: string, productId: number): Promise<void> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const user = await prismaClient.user.findUnique({
          where: {
            authId
          }
        })
        if (user === null) throw CustomError.notFound('User not found')

        const cart = await prismaClient.cart.findUnique({
          where: {
            userId: user.id
          }
        })
        if (cart === null) throw CustomError.notFound('Cart not found')

        await prismaClient.productCart.deleteMany({
          where: {
            productId,
            cartId: cart.id
          }
        })
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async updateProductQuantity (authId: string, productId: number, quantity: number): Promise<void> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const user = await prismaClient.user.findUnique({
          where: {
            authId
          }
        })
        if (user === null) throw CustomError.notFound('User not found')

        const cart = await prismaClient.cart.findUnique({
          where: {
            userId: user.id
          }
        })
        if (cart === null) throw CustomError.notFound('Cart not found')

        await prismaClient.productCart.updateMany({
          where: {
            productId,
            cartId: cart.id
          },
          data: {
            quantity
          }
        })
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async clearCart (authId: string): Promise<void> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const user = await prismaClient.user.findUnique({
          where: {
            authId
          }
        })
        if (user === null) throw CustomError.notFound('User not found')

        const cart = await prismaClient.cart.findUnique({
          where: {
            userId: user.id
          }
        })
        if (cart === null) throw CustomError.notFound('Cart not found')

        await prismaClient.productCart.deleteMany({
          where: {
            cartId: cart.id
          }
        })
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getCartInCheckout (
    authId: string
  ): Promise<{ cart: Cart, stockChanged: boolean, optionChanged: boolean }> {
    try {
      const { cart, stockChanged, optionChanged } = await prisma.$transaction(async (prismaClient) => {
        const user = await prisma.user.findUnique({
          where: {
            authId
          }
        })

        const cart = await prisma.cart.findFirst({
          where: {
            userId: user?.id
          },
          include: {
            products: {
              include: {
                product: {
                  include: {
                    options: true
                  }
                }
              }
            }
          }
        })
        if (cart === null) throw CustomError.notFound('Cart not found')

        let stockChanged: boolean = false
        let optionChanged: boolean = false

        for (const productCart of cart.products) {
          const product = productCart.product
          const selectedOption = product.options[productCart.optionSelectedIndex]

          if (selectedOption.stock < productCart.quantity) {
            await prisma.productCart.deleteMany({
              where: {
                productId: product.id,
                cartId: cart.id
              }
            })

            stockChanged = true
          }

          if (selectedOption.lastModified > productCart.addedAt) {
            await prisma.productCart.delete({
              where: {
                id: productCart.id
              }
            })

            optionChanged = true
          }
        }

        return {
          cart,
          stockChanged,
          optionChanged
        }
      })

      return { cart, stockChanged, optionChanged }
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}
