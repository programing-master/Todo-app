const {Router}=require("express");
const { register, login, logout, verifyToken } = require("../controllers/user.controller");
const { validateSchema } = require("../middlewares/validateSchema");
const { registerSchema, loginSchema } = require("../validators/user.validator");

const userRouter=Router();

userRouter.post("/register",validateSchema(registerSchema),register);
userRouter.post("/login",validateSchema(loginSchema),login);
userRouter.get('/verify', verifyToken)

module.exports=userRouter