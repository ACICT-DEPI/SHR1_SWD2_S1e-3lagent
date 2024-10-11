const express = require("express")
const authController = require("../Controllers/authentication.Controller")
const wishListController = require("../Controllers/wishList.controller")

const wishListRouter = express.Router();

wishListRouter.route("/")
.post( authController.protect , wishListController.addProductToWishList)
.get( authController.protect ,wishListController.getWishList)

wishListRouter.route("/isWished")
.post( authController.protect , wishListController.isProductWished)



wishListRouter.route("/:productId")
.delete(  authController.protect ,wishListController.deleteProductFromWishList)





module.exports = wishListRouter;