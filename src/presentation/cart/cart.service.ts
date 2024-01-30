import { CustomError } from '../../domain/errors/custom.error'
import { prisma } from '../../domain/shared/prismaClient'

import type { AddProductToCart, Cart } from '../../types/cart.types'

export class CartService {
  async createCart (userId: number): Promise<void> {
    try {
      await prisma.cart.create({
        data: {
          userId
        }
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async getCart (userId: number): Promise<Cart> {
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          userId
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
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async addProductToCart ({
    cartId, optionSelectedIndex, productId, quantity, userId
  }: AddProductToCart): Promise<void> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const cart = await prismaClient.cart.findUnique({
          where: {
            userId,
            id: cartId
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
            cartId,
            optionSelectedIndex
          }
        })
      })
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }

  async removeProductFromCart (userId: number, productId: number): Promise<void> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const cart = await prismaClient.cart.findUnique({
          where: {
            userId
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

  async updateProductQuantity (userId: number, productId: number, quantity: number): Promise<void> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const cart = await prismaClient.cart.findUnique({
          where: {
            userId
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

  async clearCart (userId: number): Promise<void> {
    try {
      await prisma.$transaction(async (prismaClient) => {
        const cart = await prismaClient.cart.findUnique({
          where: {
            userId
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
    userId: number
  ): Promise<{ cart: Cart, stockChanged: boolean, optionChanged: boolean }> {
    try {
      const cart = await prisma.cart.findFirst({
        where: {
          userId
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
    } catch (error) {
      throw CustomError.internalServerError(error as string)
    }
  }
}
