// Importing External Packages

const mongoose=require ("mongoose")
require("dotenv").config()

// Connection to MongoDB Atlas Database 

const connection=mongoose.connect(process.env.MongoURL)

module.exports={
    connection
}