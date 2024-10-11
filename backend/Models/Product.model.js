const mongoose= require("mongoose")

const productSchema = new mongoose.Schema({
   Name:{
    type:"String",
    required :[true , "product name is required"]
   },

   Description:{
    type:"String",
    required :[true , "product Description is required"]
   },

   Price:{
    type:Number,
    required :[true , "product Price is required"]
   },

   Discount:{
    type:Number,
    default:0
   },

   

   Category:{
    type:String,
    required :[true , "product Category is required"]
   }, 
   

   Image:{
    type:String,
    required :[true , "product images is required"]

   }

   

   

  

  
  },
  {
   timestamps: true
 }
  );


  const ProductModel = mongoose.model("Product" , productSchema)

  module.exports = ProductModel;