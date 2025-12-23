import { verifyTokenRequest,registerRequest,loginRequest} from '../api/user';
import {  createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

//Creating a context
export const AuthContext=createContext();


//Creating a provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      if (err) {
        const timer = setTimeout(() => {
          setErr(null)
        }, 5000)
        return () => clearTimeout(timer)
      }
    }, [err])
  
    useEffect(() => {
      let isMounted = true
      const checkLogin = async () => {
        try {
          const cookies = Cookies.get()
          if (!cookies.token) {
            if (isMounted) {
              setIsAuthenticated(false)
              setUser(null)
              setLoading(false)
            }
            return
          }
          setLoading(true)
          const res = await verifyTokenRequest(cookies.token)
          if (!res.data || !isMounted) {
            if (isMounted) {
              setIsAuthenticated(false)
              setUser(null)
              setLoading(false)
            }
            return
          }
          if (isMounted) {
            setIsAuthenticated(true)
            setUser(res.data)
  
            setLoading(false)
           
          }
        } catch (error) {
          console.error(error)
          if (isMounted) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
            setErr(error.message || 'Token verification failed')
          }
        }
      }
      checkLogin()
      return () => {
        isMounted = false
      }
    }, [])
  
//Register function
    const signUp = async values => {
      try {
        const res = await registerRequest(values)
        console.log(res.data)
        setUser(res.data)
       
        setIsAuthenticated(true)
      } catch (err) {
        console.log(err)
        setErr(err.response.data.msg)

        setIsAuthenticated(false)
      }
    }
  
    //Login function
    const signIn = async values => {
      try {
        const res = await loginRequest(values)
        setUser(res.data)
        setIsAuthenticated(true)
  
     
      } catch (err) {
        console.log(err)
        setErr(err.response.data.msg)
        setIsAuthenticated(false)
      }
    }
  //Logout function
    const logout = async () => {
      Cookies.remove('token')
      setIsAuthenticated(false)
      setUser(null)
    }
    return (
      <AuthContext.Provider
        value={{ signUp,  err, user, isAuthenticated, signIn,logout}}
      >
        {children}
      </AuthContext.Provider>
    )
  }
  