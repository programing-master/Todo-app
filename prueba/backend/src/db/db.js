const mongoose=require("mongoose");

const connectDb=()=>{
    const uri=process.env.MONGODB_URI||"mongodb://localhost/task_crud";
    try{
   console.log(`Database connected on port ${uri}`)
   mongoose.connect(uri)
    }catch(err){
        console.log(err)
    }
}
module.exports={connectDb}