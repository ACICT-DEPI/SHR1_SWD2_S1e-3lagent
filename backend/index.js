const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRouter = require("./Routers/user.router") 
const productRouter = require("./Routers/product.router")
const cartRouter = require("./Routers/cart.router")
const wishListRouter = require("./Routers/wishList.router")
const orderRouter = require("./Routers/order.router")
const upload = require("./utilities/multer")
const errorHandeler = require("./Controllers/errorHandeler.controller")
const apiError = require("./utilities/ErrorClass")
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();
const corsOptions = {
        origin:["https://shopify-iota-snowy.vercel.app/"],
        methods:["POST","GET"],
        credentials:true
    }


//middleware 

app.use(express.json())
app.options('*', cors(corsOptions));
app.use(cors(
   corsOptions
))


dotenv.config();


app.use(cookieParser())
//dassasasa
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const corsOptions ={
    origin:'https://shopify-u5gp.vercel.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use("/api/user" ,upload.fields([{ name: 'image' }]) , userRouter)
app.use("/api/product",upload.fields([{ name: 'Image' }]), productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/wishList", wishListRouter)
app.use("/api/order", orderRouter)






app.all("*" ,(req, res, next) =>{
    next(new apiError(`cant find route :${req.originalUrl}`,404))

})
//server 
app.listen(process.env.PORT , () => {
    console.log("server is listening")
})

// database connection

mongoose.connect(process.env.DB_URL,{})
.then(console.log("connected to database"))
.catch((error) => console.log("error connecting to db" ,error))

app.use(errorHandeler)


module.exports = app;
