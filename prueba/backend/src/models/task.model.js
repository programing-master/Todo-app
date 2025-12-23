const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    task:{
        type:String,
        require:true,
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
},{
    timestamps:true
})
const taskModel=new mongoose.model("Task",taskSchema);
module.exports=taskModel