const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken")
const asyncHandler = require("../utilities/asyncHandler");
const apiError = require("../utilities/ErrorClass");
const {promisify } = require("util")


exports.signup = asyncHandler( async( req,res,next) =>{
    const image = req.files['image'] ? req.files['image'][0].path : null;

    const reqBody = {
        Email : req.body.Email,
        Name : req.body.Name,
        Password : req.body.Password,
        ConfigPassword : req.body.ConfigPassword,
        Phone :  req.body.Phone,
        image:image
    }

    const newUser = await userModel.create(reqBody);
 
      
    res.status(201).send(
        {
            status :"success",
         
            data:
            {
                message:"user created successfuly",

            
                
                
            }
        
        }
    )
}
)

exports.login = asyncHandler(
    async(req, res, next) =>{
        const {Email,Password} = req.body

        if(!Email ||!Password){
            return next( new apiError("please provide email and password" , 401))
        }
        const currentUser  = await userModel.findOne({Email}).select("+Password");

        if(!currentUser ||! (await currentUser.isPasswordCorrect(Password , currentUser.Password) )){
          
          
           return next( new apiError("wrong  email or password" , 401))

        }

        const token = jwt.sign({ id: currentUser._id}, process.env.API_KEY , 
            {
                expiresIn : process.env.TIME
            }) 
            
           res.cookie("token" , token ,{
            httpOnly:true,
            secure:true,
            sameSite:"None",
            maxAge: 7200000,
            path:"/"
           })
           
        res.status(200).send(
            {
                status :"success",
             
                data:
                {
                    message:" successfuly logged in",
                    currentUser:
                    {
                        _id:currentUser._id,
                        Name:currentUser.Name, 
                        Email:currentUser.Email,
                        Phone:currentUser.Phone,
                        Role :currentUser.Role,
                        image:currentUser.image
                       
                   
                        
                    }
                  
                  
            
                    
                }
            
            }
        )
        console.log('Middleware: login');
    }
)

exports.logout = asyncHandler(
    async(req, res ,next) => {

        res.clearCookie("token" , 
        {
            httpOnly:true,
            secure:true,
            sameSite:"None",
        })

        res.send(
            {
                status:"success",
               
                data:{
                    message:"logged out succcessfully",
                   
                   
    
                }
    
            }
        )
    }

   
)

exports.protect = asyncHandler(async (req, res, next) =>{
    let token = req.cookies.token ;
  
    if(!token){
        return next( new apiError("you are not logged in ,please login",401))
    }
  
    const decoded = await promisify(jwt.verify)(token,process.env.API_KEY)

  const currentUser = await userModel.findById(decoded.id)
  if(!currentUser){
    return next(new apiError("user has been deleted" , 401))
  }

  req.currentUser = currentUser;
  console.log('Middleware: protect');
        
        next();
}) 


exports.changePassword = asyncHandler(
    async( req ,res ,next) =>{
        const currentPassword = req.body.CurrentPassword;

        if(!currentPassword) {
           return  next (new apiError("please provide current password" ,401))
        }
        const correctPassword = await userModel.findById(req.currentUser._id).select('+Password')
        console.log(correctPassword.Password)

        if(!await req.currentUser.isPasswordCorrect(currentPassword,correctPassword.Password))
        {
            return  next (new apiError("password is wrong" ,401))

        }
        if( req.body.NewPassword !==req.body.ConfigPassword)
        {
            return  next (new apiError("password and config password are not match " ,401))

        }

         req.currentUser.Password= req.body.NewPassword
         req.currentUser.ConfigPassword= req.body.ConfigPassword
         req.currentUser.save();

         //generate new token

         const token = jwt.sign({ id: req.currentUser._id}, process.env.API_KEY , 
            {
                expiresIn : process.env.TIME
            }) 
            
           res.cookie("token" , token ,{
            httpOnly:true,
            secure:true,
            sameSite:"None",
            maxAge: 7200000,
            path:"/"
           })
           res.send(
            {
                status:"success",
               
                data:{
                    message:"password has been changed succcessfully",
                    currentUser: {
                        _id: req.currentUser._id,
                        Name: req.currentUser.Name,
                        Role : req.currentUser.Role,
                        image: req.currentUser.image
                       
                   
                        
                    }
                   
    
                }

        })
    }

)

exports.checkPremission = (...roles) =>{
    return(req, res ,next) =>{
        if(!roles.includes(req.currentUser.Role)){
            return next( new apiError("you dont have permission to dispatch such actions",403) )

        }

        next();

    }


}