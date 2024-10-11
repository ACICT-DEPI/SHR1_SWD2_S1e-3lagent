const express = require("express")
const authController = require("../Controllers/authentication.Controller")
const productController = require("../Controllers/product.controller")

const productRouter = express.Router();

productRouter.route("/")
.get(productController.getAllProduct)
.post(authController.protect,authController.checkPremission("admin"),productController.AddNewProdcut)

productRouter.route("/:id")
.delete(authController.protect,authController.checkPremission("admin"),productController.deleteProduct)
.patch(authController.protect,authController.checkPremission("admin"),productController.updateProduct)





module.exports = productRouter;