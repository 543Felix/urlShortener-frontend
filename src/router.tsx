import { BrowserRouter,Routes,Route } from "react-router-dom"
import RegisterPage from "./pages/registration"
import LoginPage from "./pages/login"
import OtpVerification from "./pages/otpPage"
import HomePage from "./pages/homePAge"
import ProtectedRoute from "./protectedRoute"

function Router() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login"  element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/verifyOtp" element={<OtpVerification/>} />
      <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
      </Route>
      </Routes>
    </BrowserRouter>
     
  )
}

export default Router
