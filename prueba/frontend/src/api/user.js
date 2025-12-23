import axios from "./config/axios"
export const registerRequest=(data)=>axios.post(`/auth/register`,data) 
export const loginRequest=(data)=>axios.post(`/auth/login`,data) 
export const verifyTokenRequest=()=>axios.get(`/auth/verify`)
