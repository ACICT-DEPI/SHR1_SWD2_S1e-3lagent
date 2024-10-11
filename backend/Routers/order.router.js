const express = require("express")
const authController = require("../Controllers/authentication.Controller")
const orderController = require("../Controllers/order.controller")

const orderRouter = express.Router();

orderRouter.route("/")
.post( authController.protect , orderController.makeOrder)
.get( authController.protect ,orderController.getAllOrders)
orderRouter.route("/:order_id")
.patch( authController.protect,authController.checkPremission("admin") ,orderController.updateOrderStatus)




module.exports = orderRouter;