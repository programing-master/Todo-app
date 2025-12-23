import { createTaskRequest,getTasksRequest,getTaskRequest,deleteTaskRequest,updateTaskRequest } from '../api/task';
import { createContext, useState} from 'react'
export const TaskContext=createContext();


export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState([])
  
    const createTask = async values => {
      try {
        const res = await createTaskRequest(values)
        setTask(prevTask=>[...prevTask,res.data])       
      } catch (err) {
        console.log(err)
      }
    }
  
    const getTasks = async () => {
      try {
        const res = await getTasksRequest();
        setTask(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    const getTask = async (id) => {
      try {
        const res = await getTaskRequest(id);
        return res.data;
      } catch (err) {
        console.log(err)
      }
    }

    const deleteTask=async(id)=>{
      try {
        await deleteTaskRequest(id);
      } catch (error) {
        console.log(error)
      }
    }

    const updateTask=async(id,data)=>{
      try{
       await updateTaskRequest(id,data);
      }catch(err){
        console.log(err)
      }
    }
  
 
    return (
      <TaskContext.Provider
        value={{ createTask, getTasks,task,getTask,deleteTask,updateTask}}
      >
        {children}
      </TaskContext.Provider>
    )
  }
  