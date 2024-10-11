const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


//schema 

const userSchema = mongoose.Schema(
    {
        Name:{
            type:String,
            required:[true , "Name is required"],

        },
        Email:{
            type:String,
            required:[true , "Email is required"],
            unique : [true, "this email is used try another one"]
            
        },
        Phone:{
            type:String,
            required:[true , "Phone is required"],
           
            
        },
        Password :{
            type:String,
            required:[true , "Password is required"],
            minlength:[5 , "password shoud be at least 5 chars"],
            select : false,

        },
        image:{

            type:String,
            
        
           },
        ConfigPassword :{
            type:String,
            required:[true , "ConfigPassword is required"],
            minlength:[5 , "password shoud be at least 5 chars"],
            validate:
            {
                validator : function(value) {
                    return this.Password ===value
                },
                message:"Password and Config Password do not match"
            }

        },
        PasswordChangedAt :Date,

        Role:{
            type : String,
            enum:{
                values:["admin", "user"],
                message:"role is admin or user only"
            },
            default:"user"
        }

    }
)
userSchema.pre("save" , async function (next){

    if(this.isModified("Password")){
        this.Password = await bcrypt.hash (this.Password , 12)
        this.ConfigPassword = undefined
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function(password,correctPassword){
     return await bcrypt.compare (password, correctPassword)
}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel;