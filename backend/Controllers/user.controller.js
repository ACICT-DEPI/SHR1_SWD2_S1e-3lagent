const userModel = require("../Models/user.model");

const asyncHandler = require("../utilities/asyncHandler");
const apiError = require("../utilities/ErrorClass");


exports.getUserData = asyncHandler(async(req ,res ,next) =>{

    console.log("role" ,req.currentUser)
    
    
    res.status(200).send(
        {
            status:"sucess",
            data:{
                message :"user retrieved sucessfuly",
                currentUser:req.currentUser
                          }
        }
    )
    
})


exports.updateUserData = asyncHandler(async(req ,res ,next) =>{
    const image = req.files['image'] ? req.files['image'][0].path : null;
   
    let updatedBody ={
        Name : req.body.Name,
        Email :req.body.Email,
        Phone : req.body.Phone,
       
     }
    
    if(image ==null){
      
    }
    else{
        updatedBody={...updatedBody,image:image}
        
    }

   

    const newUser = await userModel.findByIdAndUpdate(req.currentUser._id,updatedBody,
        {
            new:true,
            runValidators:true,
        })
   
   

    res.status(200).send(
        {
            status:"sucess",
            data:{
                message :"user updated sucessfuly",
                user:
                {
                    id:newUser._id,
                    Name:newUser.Name,
                    Phone:newUser.Phone,
                    Email:newUser.Email,
                    image:newUser.image,
                    Role:newUser.Role,
                    
                }
            }
        }
    )
    
})


exports.getAllUsers = asyncHandler(async(req ,res ,next) =>{

    const allUsers = await userModel.find();

    res.status(200).send(
        {
            status:"success",
            data:{
                message:"users retrieved succesfully",
                allUsers,
                
            }
        }
    )




})

exports.changeRole = asyncHandler(async(req ,res ,next) =>{

    const {Role,id} = req.body
    

   
    const updatedUser = await userModel.findByIdAndUpdate(id ,{Role:Role}, {
        new:true,
        runValidators:true,
    })
    res.status(200).send(
        {
            
            status:"sucess",
            data:{
                message :"user Role updated sucessfuly",
            }
        }
    )
})