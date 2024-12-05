import React, { useState ,useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../utils/axiosInstace";

interface Login{
    email:string;
    password:string

}

const LoginPage = ()=>{
         
    const [loginData,setLoginData] = useState<Login>({
        email:'',
        password:''
    })
    
    const [showPassword,setShowPassword] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(()=>{
        const data = localStorage.getItem('userData')
        if(data){
          navigate('/')
        }
      },[navigate])
    const updateData = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setLoginData((prevState)=>{
            return{
                ...prevState,
                [name]:value
            }
        })
    }
      

    const login = ()=>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(loginData.email.trim().length===0){
            toast.error('Email field is required')
        }else if(!emailRegex.test(loginData.email.trim())){
            toast.error('Enter a valid email')
        }else if(loginData.password.trim().length===0){
            toast.error('Password field is required')
        }else{
            AxiosInstance.post('/users/login',{email:loginData.email.trim(),password:loginData.password.trim()})
            .then((res)=>{
                if(res.data){
                    const data = JSON.stringify(res.data)
                    localStorage.setItem('userData',data)
                    toast.success('Login Successfull')
                    navigate('/')
                }
            })
        }
    }


    return(
        <div className="h-screen bg-white py-20 p-4 md:p-20 lg:p-32">
    <div className="max-w-sm bg-white border border-indigo-500 rounded-lg overflow-hidden shadow-lg mx-auto">
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-700 mb-6">Please sign in to your account</p>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email' id="email" type="text" value={loginData.email} placeholder="email" onChange={(e)=>updateData(e)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>  
          <div className="relative">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type={`${showPassword?'text':'password'}`} value={loginData.password} name="password"  placeholder="Password" onChange={(e)=>updateData(e)}/>
          <FontAwesomeIcon className="absolute top-3 right-4" icon={showPassword?faEyeSlash:faEye} onClick={()=>setShowPassword(!showPassword)}/>
          </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={login}  >
            Sign In
          </button>
                    <a className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-600"  onClick={()=>navigate('/register')}>
                       Dont have account? Signup..
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>
    )
}

export default LoginPage