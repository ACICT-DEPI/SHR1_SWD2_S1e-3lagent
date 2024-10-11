const mongoose= require("mongoose")

const orderSchema = new mongoose.Schema({
  
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
   
  },

  Status: {
    type: String,
    required: true,
    enum:{
        values:["Pending" ,"Accepted" ,"Completed"],
        message:"status can be Pending, Accepted, Completed only"
    },
   default:"Pending"
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
    ],
    
      ShippingInfo:{
        
          Name: 
          { 
            type: String,
             required:[true ," Shipping Name is required"] 
            },
          Email:
           {
             type: String, 
            required:[true ,"Shipping Email is required"]
        },
          Country: { 
            type: String,
            required: [true ,"Shipping Country is required"]
         },
    
         StreetAddress: { 
          type: String,
          required: [true ,"Shipping StreetAddress is required"]
       },
    
       City: { 
        type: String,
        required: [true ,"Shipping City is required"]
       },

     State: { 
      type: String,
      required: [true ,"Shipping State is required"]
    },
    ZIP: { 
      type: String,
      required: [true ,"Shipping ZIP is required"]
    },

  
     
     
       
        
      }

  

   

  
  },
  {
    timestamps: true
  }
  );


  const orderModel = mongoose.model("Order" , orderSchema)

  module.exports = orderModel;