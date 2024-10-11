const express = require("express")
const authController = require("../Controllers/authentication.Controller")
const cartController = require("../Controllers/cart.controller")

const cartRouter = express.Router();

cartRouter.route("/")
.get( authController.protect ,cartController.getCart)
.post( authController.protect , cartController.addProductToCart)
.delete( authController.protect , cartController.clearCart)

cartRouter.route("/:productIndex")
.delete(  authController.protect ,cartController.deleteProductFromCart)
.patch(  authController.protect ,cartController.updateItemQuantity)





module.exports = cartRouter;