/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-extraneous-class */

import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { Router } from 'express'
import {
  addProductToCartValidation,
  getCartValidation,
  removeProductFromCartValidation,
  updateProductQuantityValidation,
  userIdValidation
} from '../../middleware/models-validations/cart-validations'

export class CartRoutes {
  static get routes (): Router {
    const router = Router()
    const service = new CartService()
    const controller = new CartController(service)

    router.post('/cart', userIdValidation, controller.createCart)
    router.post('/cart/add-product', addProductToCartValidation, controller.addProductToCart)

    router.get('/cart/:userId', getCartValidation, controller.getCart)
    router.get('/cart/checkout/:userId', getCartValidation, controller.getCartInCheckout)

    router.put('/cart/update-product-quantity', updateProductQuantityValidation, controller.updateProductQuantity)

    router.delete('/cart/remove-product', removeProductFromCartValidation, controller.removeProductFromCart)
    router.delete('/cart', userIdValidation, controller.clearCart)

    return router
  }
}
