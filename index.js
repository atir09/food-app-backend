// Importing External Packages

const express=require("express")
const cors= require("cors")
require("dotenv").config()


//  Importing Internal Modules

const {connection}=require("./config/db.js")
const {UserRoute}=require("./Routers/UserRoute.js")
const {ResRouter}=require("./Routers/Restaurant.js")



// .....................................................................................................
const app=express()
app.use(cors())
app.use(express.json())
app.use(cors({origin:"*"}))

app.get("/",(req,res)=>{
    res.send("Base Api of Atir-Food Delivery App")
})

app.use("/user",UserRoute)

app.use("/api/restaurants",ResRouter)



// .....................................................................................................


//  Server Listen

app.listen(process.env.PORT,async()=>{
    try {
       await connection
       console.log("Connected To DB")
    } catch (error) {
        console.log(error)
    }

    console.log(`Listening on port ${process.env.port}`)
})
