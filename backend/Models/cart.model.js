const mongoose= require("mongoose")

const cartSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
   
  },


    Products :[
      {
      Name: 
      { 
        type: String,
         required:[true ,"Name is required"] 
        },
      Image:
       {
         type: String, 
        required:[true ,"Image is required"]
    },
      Price: { 
        type: Number,
        required: [true ,"Price is required"]
     },

     Discount: { 
      type: Number,
      default:0
   },

     Quantity: { 
        type: Number,
        default:1
     },

 
 
   
    }
    ]

   

  
  }
  );


  const CartModel = mongoose.model("Cart" , cartSchema)

  module.exports = CartModel;