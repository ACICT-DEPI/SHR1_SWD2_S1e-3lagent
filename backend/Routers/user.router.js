const express = require("express")
const authController = require("../Controllers/authentication.Controller")
const userController = require("../Controllers/user.controller")

const userRouter = express.Router();

userRouter.route("/signup")
.post(authController.signup)

userRouter.route("/login")
.post(authController.login)

userRouter.route("/logout")
.post(authController.logout)

userRouter.route("/change-password")
.patch(authController.protect,authController.changePassword)

userRouter.route("/")
.get(authController.protect ,userController.getUserData)
.patch(authController.protect ,userController.updateUserData)

userRouter.route("/changeRole")
.patch(authController.protect, authController.checkPremission("admin"),userController.changeRole)

userRouter.route("/all")
.get(authController.protect,authController.checkPremission("admin") ,userController.getAllUsers)



module.exports = userRouter;