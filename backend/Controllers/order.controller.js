const asyncHandeler = require("../utilities/asyncHandler");
const OrderModel = require("../Models/order.model")
const ApiFeatuers = require("../utilities/ApiFeatures") 
const apiError = require("../utilities/ErrorClass") 

//get cart 

exports.getAllOrders = asyncHandeler(
    async(req, res ,next) =>{
        const userId= req.currentUser._id

        let orders;

        if (req.currentUser.Role === "user") {
            orders = await OrderModel.aggregate([
                { $match: { userId } }, 
                {
                    $addFields: {
                        statusOrder: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$Status", "Pending"] }, then: 0 },
                                    { case: { $eq: ["$Status", "Accepted"] }, then: 1 },
                                    { case: { $eq: ["$Status", "Completed"] }, then: 2 }
                                ],
                                default: 3
                            }
                        }
                    }
                },
                { $sort: { statusOrder: 1, createdAt: -1 } } 
            ]);
        } else if (req.currentUser.Role === "admin") {
            orders = await OrderModel.aggregate([
                {
                    $addFields: {
                        statusOrder: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$Status", "Pending"] }, then: 0 },
                                    { case: { $eq: ["$Status", "Accepted"] }, then: 1 },
                                    { case: { $eq: ["$Status", "Completed"] }, then: 2 }
                                ],
                                default: 3
                            }
                        }
                    }
                },
                { $sort: { statusOrder: 1, createdAt: -1 } } // Sort by statusOrder and createdAt
            ]);
        }
        
        
        if(!orders){
            return next(new apiError("cant get orders") ,404 )
        }

        res.status(200).send(
            {
                status:"success",
                data:{
                    message:"orders are retrieved ",
                    orders

                }
            }
        )


    }
)



//add item to cart

exports.makeOrder = asyncHandeler(async (req, res, next) => {
    const {Products , ShippingInfo} = req.body;
    const userId= req.currentUser._id

    console.log(req.body)
    if ( !Products ){
        return next( new apiError("products is required", 401))
    }

    const Order = {
        Products,
        userId,
        ShippingInfo

    }

    const newOrder = await OrderModel.create(Order)

  
   
      return res.status(201).send({
        status: "success",
        data: {
          message: "order is confirmed",
          newOrder
        }
      });
  
   
            
        
    });
  

  



  
exports.updateOrderStatus = asyncHandeler(async (req, res, next) => {
    const {order_id } = req.params;
   
    
    if ( !req.body.selectedOption ){
        return next( new apiError("newStatus is required", 401))
    }


    const newOrder = await OrderModel.findByIdAndUpdate(order_id, {Status: req.body.selectedOption} ,{
        new:true,
        runValidators:true
    })

  
   
      return res.status(201).send({
        status: "success",
        data: {
          message: "Order status is updated ",
          newOrder
        }
      });
  
   
        
    
  });
  

  