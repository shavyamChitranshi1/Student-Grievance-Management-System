const express=require("express");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const Student=require("../models/Student");

const router=express.Router();


// REGISTER
router.post("/register",async(req,res)=>{

const {name,email,password}=req.body;

try{

let user=await Student.findOne({email});

if(user)
return res.status(400).json("Email already exists");

const hashedPassword=await bcrypt.hash(password,10);

user=new Student({
name,
email,
password:hashedPassword
});

await user.save();

res.json("Registered Successfully");

}
catch(error){
res.status(500).json(error);
}

});


// LOGIN
router.post("/login",async(req,res)=>{

const {email,password}=req.body;

try{

const user=await Student.findOne({email});

if(!user)
return res.status(400).json("Invalid email");

const validPass=await bcrypt.compare(
password,
user.password
);

if(!validPass)
return res.status(400).json("Wrong password");

const token=jwt.sign(
{id:user._id},
"secretkey"
);

res.json({token});

}

catch(error){
res.status(500).json(error);
}

});

module.exports=router;