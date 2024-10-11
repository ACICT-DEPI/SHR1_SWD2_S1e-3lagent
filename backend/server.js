const app = require("./app")
const mongoose = require("mongoose")

app.listen(process.env.PORT , () => {
    console.log("server is listening")
})

// database connection

mongoose.connect(process.env.DB_URL,{})
.then(console.log("connected to database"))
.catch((error) => console.log("error connecting to db" ,error))


