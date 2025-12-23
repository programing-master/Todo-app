import axios from "./config/axios"

export const createTaskRequest=(data)=>axios.post(`/task`,data);
export const getTasksRequest=()=>axios.get(`/task`)
export const getTaskRequest=(id)=>axios.get(`/task/${id}`)
export const deleteTaskRequest=(id)=>axios.delete(`/task/${id}`)
export const updateTaskRequest=(id,data)=>axios.put(`/task/${id}`,data)