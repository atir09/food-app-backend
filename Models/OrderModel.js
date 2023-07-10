// Importing External Packages

const mongoose = require("mongoose")

// ..................................................................

const itemSchema=mongoose.Schema({
    name:String,
    price:Number,
    quantity:Number
})

const OrderSchema=mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    restaurant:{
        type:mongoose.Types.ObjectId,
        ref:"Res"
    },
    items:[itemSchema],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
      },
      status:{
        type:String,
        enum:["placed", "preparing", "on the way", "delivered"]
      }

})

const Order=mongoose.model("Order",OrderSchema)

module.exports={
    Order
}