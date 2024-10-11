const asyncHandeler = require("../utilities/asyncHandler");
const CartModel = require("../Models/cart.model")
const ApiFeatuers = require("../utilities/ApiFeatures") 
const apiError = require("../utilities/ErrorClass") 

//get cart 

exports.getCart = asyncHandeler(
    async(req, res ,next) =>{
        const userId= req.currentUser._id
        
        const cart = await CartModel.findOne({userId})
        if(!cart){
            return next(new apiError("cant get cart") ,404 )
        }

        res.status(200).send(
            {
                status:"success",
                data:{
                    message:"cart is retrieved ",
                    cart:cart

                }
            }
        )


    }
)

exports.clearCart = asyncHandeler(
  async(req, res ,next) =>{
      const userId= req.currentUser._id
      
      const cart = await CartModel.findOne({userId})
      if(!cart){
          return next(new apiError("cant get cart") ,404 )
      }

      cart.Products = [];
      cart.save()

      res.status(204).send(
          {
              status:"success",
              
          }
      )


  }
)




//add item to cart

exports.addProductToCart = asyncHandeler(async (req, res, next) => {
    const { Name, Image, Price, Discount, Quantity } = req.body;
  
    // Check if the cart exists for the user
   
    const userId= req.currentUser._id
    let cart = await CartModel.findOne( {userId});
  
    if (cart) {
      // Cart exists, check if the product is already in the cart
      const productIndex = cart.Products.findIndex(product => product.Name === Name);
  
      if (productIndex > -1) {
        // If product exists in the cart, increase the quantity
        cart.Products[productIndex].Quantity += Quantity || 1;
      } else {
        // If product does not exist, add the new product to the cart
        cart.Products.push({
          Name,
          Image,
          Price,
          Discount,
          Quantity: Quantity || 1
        });
      }
  
      // Save the updated cart
      await cart.save();
  
      return res.status(201).send({
        status: "success",
        data: {
          message: "Item is added to cart",
          cart
        }
      });
  
    } else {
      // If no cart exists for the user, create a new one
      const newCartItem = await CartModel.create({
        userId,
        Products: [
          {
            Name,
            Image,
            Price,
            Discount,
            Quantity: Quantity || 1
          }
        ]
      });
  
      res.status(201).send({
        status: "success",
        data: {
          message: "New cart created and item added",
          newCartItem
        }
      });
    }
  });
  

//delete item from cart

exports.deleteProductFromCart = asyncHandeler(
    async(req, res ,next) =>{
        const productIndex = req.params.productIndex

        const userId= req.currentUser._id
        let cart = await CartModel.findOne( {userId});
      
        if (cart) {

      
          if (productIndex > -1) {
            // If product exists in the cart, increase the quantity
            cart.Products = cart.Products.filter((product) => product != cart.Products[productIndex])
            await cart.save()

          }
          else
          {
            return next (new apiError("item not found" ,404))
          }
        }

        res.status(204).send(
            {
                status:"success",
                data:{
                    message:"item is removed from cart",
                    
                }
            }
        )


    }
)

//update  item quantity 

exports.updateItemQuantity = asyncHandeler(
    async(req, res ,next) =>{

      const {newQuantity} = req.body
      const productIndex = req.params.productIndex

      const userId= req.currentUser._id

      let cart = await CartModel.findOne( {userId});
  
      if (cart) {

        if(newQuantity <1){
          return next (apiError("qunatity cant be less than 1"))
        }
      
    
        if (productIndex > -1) {
          // If product exists in the cart, increase the quantity
          cart.Products[productIndex].Quantity = newQuantity;
          cart.save()
        }
        

      }
      

    

        res.status(200).send(
            {
                status:"success",
                data:{
                    message:"item quantity is modified",
                    
                    
                }
            }
        )


          }
)







