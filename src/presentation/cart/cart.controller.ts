import { CustomError } from '../../domain/errors/custom.error'

import type { CartService } from './cart.service'
import type { Request, Response } from 'express'

export class CartController {
  constructor (
    private readonly cartService: CartService
  ) {}

  private readonly handleError = (error: unknown, res: Response): Response => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(500).json({ message: 'Internal server error' })
  }

  createCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.body

      await this.cartService.createCart(userId as number)

      return res.status(201).json({ message: 'Cart created' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.params

      const cart = await this.cartService.getCart(Number(userId))

      return res.status(200).json(cart)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  addProductToCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { cartId, optionSelectedIndex, productId, quantity, userId } = req.body

      await this.cartService.addProductToCart({
        cartId,
        userId,
        quantity,
        productId,
        optionSelectedIndex
      })

      return res.status(201).json({ message: 'Product added to cart' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  removeProductFromCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { productId, userId } = req.body

      await this.cartService.removeProductFromCart(
        userId as number,
        productId as number
      )

      return res.status(200).json({ message: 'Product removed from cart' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  updateProductQuantity = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { productId, quantity, userId } = req.body

      await this.cartService.updateProductQuantity(
        userId as number,
        productId as number,
        quantity as number
      )

      return res.status(200).json({ message: 'Product quantity updated' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  clearCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.body

      await this.cartService.clearCart(userId as number)

      return res.status(200).json({ message: 'Cart cleared' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getCartInCheckout = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId } = req.body

      const {
        cart,
        stockChanged,
        optionChanged
      } = await this.cartService.getCartInCheckout(userId as number)

      return res.status(200).json({
        cart,
        stockChanged,
        optionChanged
      })
    } catch (error) {
      return this.handleError(error, res)
    }
  }
}
