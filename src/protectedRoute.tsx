import { Navigate,Outlet } from "react-router-dom"

const ProtectedRoute = ()=>{
    const userData = localStorage.getItem('userData')
    console.log('userData = ',userData)
    
    return userData? <Outlet/>: <Navigate to='/login' />
}

export default ProtectedRoute