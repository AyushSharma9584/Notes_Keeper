const express = require("express")
const app = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Ayushdev$techie'
const fetchuser=require('../middleware/fetchuser')


// app.get("/",(req,res)=>{
//     res.send("Your Welcome Bro")
// })

//API for sign in--->

app.post("/register",
  [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body('password', "password is too small").isLength({ min: 5 })
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //checking whether the user with this email exists already--->
    let data = await User.findOne({ email: req.body.email });
    if (data) {
      return res.status(400).json({ success,error: "sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    data = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const info = {
      user: {
        id: User.id
      }
    }
    const authtoken = jwt.sign(info, JWT_SECRET);

    success=true
    res.json({success,authtoken})

    // res.send("successfully posted")

    // .then(user=>res.json(user)).catch(err=>{console.log(err)
    // res.json({error:'Please enter a unique value for email'})})
    // const user = User(req.body)
    // await user.save();
    // res.send(user);
    // res.send(data);


  })


//API for Login--->

app.post("/login",
  [
    body("email", "enter a valid email").isEmail(),
    body('password', "password is too small").exists()
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    let user=await User.findOne({email})
    if(!user){
      success=false;
      return res.status(400).json({error:"please enter correct credentials"});
    }
    const passwordcompare=await bcrypt.compare(password,user.password);
    if(!passwordcompare){
      success=false;
      return res.status(400).json({success,error:"please enter correct credentials"});
    }

    const info = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(info, JWT_SECRET);
    success=true;
    res.json({success,authtoken})
  })

//api for getting user details--->

app.post("/getuser",fetchuser, async (req, res) => {
   const userId=req.user.id;
   const user=await User.findById(userId).select("-password")
   res.send(user)
  })

module.exports = app