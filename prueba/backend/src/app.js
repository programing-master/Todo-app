require("dotenv").config()
const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser")
const morgan=require("morgan");
const { connectDb } = require("./db/db");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
const port=process.env.PORT||4000;

const app=express();

//middlewares
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:8000",
    credentials:true
}))

//routes
app.use("/auth",userRouter)
app.use(taskRouter)
//db
connectDb()

module.exports={app,port}