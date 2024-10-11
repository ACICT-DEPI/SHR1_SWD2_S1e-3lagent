const asyncHandeler = (func) =>{
    console.log("inside asyncHandeler")

    return (req ,res, next) =>{
        func(req, res,next).catch(next)

    }

}

module.exports = asyncHandeler