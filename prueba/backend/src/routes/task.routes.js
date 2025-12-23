const {Router}=require("express");
const { validateToken } = require("../middlewares/validateToken");
const { validateSchema } = require("../middlewares/validateSchema");
const { createTask, getTasks, updateTask, deleteTask, getTask } = require("../controllers/task.controller");
const { taskSchema } = require("../validators/task.validator");

const taskRouter=Router();

taskRouter.post("/task",validateToken,validateSchema(taskSchema),createTask);
taskRouter.get("/task",validateToken,getTasks);
taskRouter.get("/task/:id",validateToken,getTask);
taskRouter.put("/task/:id",validateToken,validateSchema(taskSchema),updateTask);
taskRouter.delete("/task/:id",validateToken,deleteTask);


module.exports=taskRouter
