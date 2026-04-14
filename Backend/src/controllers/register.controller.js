const bcrypt= require ("bcrypt")
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function register (req,res){
    const {name,email,password} = req.body

    const isUserExists =await User.findOne({email})
    if(isUserExists){
        return res.status(400).json({
            message:"user already exists"
        })
    } 
     const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET)
  
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })


  
    res.cookie("token",token)
    res.status(200).json({
        message:"user registered successfully",
        user,
    })
}

module.exports = { register}