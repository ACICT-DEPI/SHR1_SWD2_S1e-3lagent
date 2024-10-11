const asyncHandeler = require("../utilities/asyncHandler");
const wishListModel = require("../Models/wishList.model")
const apiError = require("../utilities/ErrorClass") 
const ApiFeatuers = require("../utilities/ApiFeatures")

//get cart 

exports.getWishList= asyncHandeler(
    async(req, res ,next) =>{
        const userId= req.currentUser._id
        

        const wishList = await wishListModel.findOne({userId})

          res.status(200).send(
            {
                status:"success",
                data:{
                    message:"wishList is retrieved ",
                    wishList:wishList,
                   

                }
            }
        )


    }
)



//add item to cart

exports.addProductToWishList = asyncHandeler(async (req, res, next) => {
    const { _id, Name, Image, Price, Discount } = req.body;
  
    // Check if the cart exists for the user
   
    const userId= req.currentUser._id
    let wishList = await wishListModel.findOne( {userId});
  
    if (wishList) {

        wishList.Products.push({
          _id,
          Name,
          Image,
          Price,
          Discount,
          
        });

        await wishList.save();
  
        return res.status(201).send({
          status: "success",
          data: {
            message: "Item is added to wishList",
            wishList
          }
        });
      }
  
      
     
  
   else {
      // If no cart exists for the user, create a new one
      const newWishList= await wishListModel.create({
        userId,
        Products: [
          {
            _id,
            Name,
            Image,
            Price,
            Discount,
           
          }
        ]
      });
  
      res.status(201).send({
        status: "success",
        data: {
          message: "New cart created and item added",
          newWishList
        }
      });
    }
  });
  

//delete item from cart

exports.deleteProductFromWishList = asyncHandeler(
    async(req, res ,next) =>{
        const productId = req.params.productId
        console.log(productId)


        const userId= req.currentUser._id
        let wishList = await wishListModel.findOne( {userId});
      
        if (wishList) { 
            const productIndex = wishList.Products.findIndex(product => product._id == productId);
          if (productIndex > -1) {
            
            wishList.Products = wishList.Products.filter((product) => product != wishList.Products[productIndex])
            await wishList.save()

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
                    message:"item is removed from wishList",
                    
                }
            }
        )


    }
)




exports.isProductWished = asyncHandeler(
    async(req, res ,next) =>{

        let isWished ;
        const productId = req.body.productId

        const userId= req.currentUser._id
        let wishList = await wishListModel.findOne( {userId});
      
        if (wishList) { 
            const productIndex = wishList.Products.findIndex(product => product._id == productId);
          if (productIndex > -1) {
            
           isWished = true;

          }
          else
          {
            isWished = false;
          }
        }

        res.status(200).send(
            {
                status:"success",
                data:{
                    message:"item is removed from wishList",
                    isWished
                    
                }
            }
        )


    }
)
