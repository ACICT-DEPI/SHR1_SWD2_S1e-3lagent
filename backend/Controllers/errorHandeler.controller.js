const apiError = require("../utilities/ErrorClass")

    const handleDevEror = (req ,res ,err) =>{
        res.status(err.statusCode).json(
            {
                status:err.status,
                message :err.message,
                err:err,
                stack: err.stack

            }
        )
    }

   
    const handleProEror = (req ,res ,err) =>{
        console.log("inside handleProEror")
        if(err.isOperational)
        {
              res.status(err.statusCode).json(
                {
                    status:err.status,
                    message :err.message,
                
                }
            )
        }
        else{
              res.status(err.statusCode).json(
                {
                    status:"error",
                    message :"something wentWrong"
                
        
                }
            )
        }
    }

  





    const errorHandeler = (err ,req ,res ,next) =>{
        err.statusCode = err.statusCode || 500;
        err.status =  err.status||"fail"


     
   console.log(process.env.NODE_ENV)

        if(process.env.NODE_ENV ==="development")
        {
            handleDevEror(req, res, err)
        }
        else if(process.env.NODE_ENV.trim() == "production"){
            let errorHandle ={...err}
            

         if(err.name == "JsonWebTokenError")
          {   errorHandle= new apiError( "invalid token please login ",401)
          }
        
        if(err.name == "TokenExpiredError") 
        {   errorHandle= new apiError( "expired please login again ",401)
          }
           
        
            handleProEror(req, res, errorHandle)


        }
       

        
        

    }

    module.exports = errorHandeler;