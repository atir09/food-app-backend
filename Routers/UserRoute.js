// Importing External Packages

const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require('dotenv').config()

// Importing Model

const {UserModel}=require("../Models/UserModel.js")

// ...............................................................
const UserRoute =express.Router()


// ..............Get ALL Users.............
UserRoute.get("/",async(req,res)=>{
    try {
        const user=await UserModel.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({msg:"something went wrong",error:error.message})
        console.log(error)
    }
})


// ..................Register User.............

UserRoute.post("/api/register",async(req,res)=>{
    const {name,email,password,address}=req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        let user=new UserModel({name,email,password:hashedPassword,address})
        await user.save()    
        res.status(201).send({msg:"User Registered Successfully"})

    } catch (error) {
        res.status(501).send({msg:"Server Error",error:error.message})
        console.log(error)
    }
})


// .........................Login User...........................

UserRoute.post("/api/login",async(req,res)=>{
    const {email,password}=req.body
    try {

        let user=await UserModel.findOne({email})
        if(!user){
            res.status(401).send({msg:"No User Registered With the provided Email,plz sign up"})
            return
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                var token = jwt.sign({ user: email }, process.env.JwtKey);
                res.status(201).send({msg:"Login Successful",token})
            }else{
                console.log(err)
                res.status(401).send({msg:"Password Incorrect"})
            }
        });
    } catch (error) {
        console.log(error)
        res.status(501).send({msg:"Server Error",error:error.message})
        
    }
})


// ..................Reset Password..............................

UserRoute.put("/api/user/:id/reset",async(req,res)=>{
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
    
        let user = await UserModel.findById(id);
    
        if (!user) {
          return res.status(404).send({ msg: 'User not found' });
        }
    
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).send({ msg: 'Invalid current password' });
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 5);
    
        // Updating the user's password
        user.password = hashedPassword;
        await user.save();
    
        res.status(204).send({ msg: 'Password reset successful' });
      } catch (error) {
        res.status(500).send({ msg: 'An error occurred',error:error.message });
      }
})

module.exports={
    UserRoute
}