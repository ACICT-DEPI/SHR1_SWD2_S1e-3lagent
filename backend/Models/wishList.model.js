const mongoose= require("mongoose")

const wishListSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
   
  },


    Products :[
      {
        _id: 
        { 
          type:  mongoose.Schema.Types.ObjectId,
           required:[true ,"_id is required"] 
          },
      Name: 
      { 
        type: String,
         required:[true ,"Name is required"] 
        },
        Image:{

          type:String,
          required :[true , "product image is required"]
      
         },
      Price: { 
        type: Number,
        required: [true ,"Price is required"]
     },

     Discount: { 
      type: Number,
      default:0
   }
 
 
   
    }
    ]

   

  
  }
  );


  const wishListModel = mongoose.model("WishList" , wishListSchema)

  module.exports = wishListModel;