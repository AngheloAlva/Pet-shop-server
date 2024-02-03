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
      const { authId } = req.body

      await this.cartService.createCart(authId as string)

      return res.status(201).json({ message: 'Cart created' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { authId } = req.params

      const cart = await this.cartService.getCart(authId)

      return res.status(200).json(cart)
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  addProductToCart = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { optionSelectedIndex, productId, quantity, authId } = req.body

      await this.cartService.addProductToCart({
        authId,
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
      const { productId, authId } = req.body

      await this.cartService.removeProductFromCart(
        authId as string,
        productId as number
      )

      return res.status(200).json({ message: 'Product removed from cart' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  updateProductQuantity = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { productId, quantity, authId } = req.body

      await this.cartService.updateProductQuantity(
        authId as string,
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
      const { authId } = req.body

      await this.cartService.clearCart(authId as string)

      return res.status(200).json({ message: 'Cart cleared' })
    } catch (error) {
      return this.handleError(error, res)
    }
  }

  getCartInCheckout = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { authId } = req.body

      const {
        cart,
        stockChanged,
        optionChanged
      } = await this.cartService.getCartInCheckout(authId as string)

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
