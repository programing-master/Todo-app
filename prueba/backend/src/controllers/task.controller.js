const taskModel = require("../models/task.model");

const createTask=async(req,res)=>{
    try {
       const {task}=req.body;
       if(await taskModel.findOne({task})){
        return res.status(500).json({msg:[["Task already exists"]]})
       }
       const newTask=taskModel({
        task,user:req.user.id
       })
       const savedTask=await newTask.save()
       if(!savedTask){
        return res.status(500).json({msg:[["It has not been possible to save the task"]]})
       }
       res.send(savedTask)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
const getTasks=async(req,res)=>{
    try {
       const tasks=await taskModel.find({user:req.user.id}).populate("user");
       res.send(tasks)
    } catch (error) {
      console.log(error)
        res.send(error)
    }
}
const updateTask=async(req,res)=>{
    const {id}=req.params;

    try {
          if(!id){
            return res.status(404).json({msg:[["the resource cannot be accessed"]]})
          }
          const taskUpdated=await taskModel.findByIdAndUpdate(id,req.body,{new:true}).populate("user")
          if(!taskUpdated){
            return res.status(500).json({msg:[["the task could not be modified"]]})
          }
          res.send(taskUpdated)
    } catch (error) {
        res.send(error)
    }
}
const getTask=async(req,res)=>{
  const {id}=req.params;

  try {
        if(!id){
          return res.status(404).json({msg:[["the resource cannot be accessed"]]})
        }
        const taskFound=await taskModel.findById(id).populate("user")
        if(!taskFound){
          return res.status(500).json({msg:[["the task could not exists"]]})
        }
        res.send(taskFound)
  } catch (error) {
      res.send(error)
  }
}
const deleteTask=async(req,res)=>{
    const {id}=req.params;

    try {
          if(!id){
            return res.status(404).json({msg:[["the resource cannot be accessed"]]})
          }
          const taskDeleted=await taskModel.findByIdAndDelete(id)
          if(!taskDeleted){
            return res.status(500).json({msg:[["the task could not be deleted"]]})
          }
          res.send("Task has been deleted")
    } catch (error) {
        res.send(error)
    }
}
module.exports={createTask,getTasks,updateTask,deleteTask,getTask}