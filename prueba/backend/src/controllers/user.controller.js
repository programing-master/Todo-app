const { createAccessToken } = require("../libs/jwt");
const userModel = require("../models/user.model");
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")
const register=async(req,res)=>{
    try {
        //picking data from body
       const {username,email,password}=req.body;
       if(await userModel.findOne({email})){
         return res.status(500).json({msg:[["The user already exists"]]})
       }
       //hashing password
       const hashPassword=await bcrypt.hash(password,10);
       const newUser=userModel({
        username:`@${username}`,email,password:hashPassword
       })
       const savedUser=await newUser.save();

       //creating access Token
       const token=await createAccessToken({id:savedUser._id});
       res.cookie("token",token)
       if(!savedUser){
        return res.status(500).json({msg:[["The user could not register"]]})
    }
    res.send(savedUser)
    } catch (error) {
        console.log(error)
       return res.status(500).json({"msg":error})
    }
}
const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userFound=await userModel.findOne({email});
        if(!userFound){
            return res.status(500).json({msg:[["The user not exists"]]})
        }
        const match=await bcrypt.compare(password,userFound.password);
        if(!match){
            return res.status(500).json({msg:[["invalid credentials"]]})
        }
        const token=await createAccessToken({id:userFound});
        res.cookie("token",token)
        res.send(userFound)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ msg: [['unauthorized']] })
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: [['unauthorized']] })
      } else {
        const userFound = await userModel.findById(decoded.id)
        if (!userFound) {
          return res.status(400).json({ msg: [['User not exists']] })
        }
      res.send(userFound)
      }
    })
  }
module.exports={register,login,verifyToken}