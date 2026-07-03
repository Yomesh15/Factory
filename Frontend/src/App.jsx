import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import OTPVerify from './pages/OTPVerify'
import UserHomepage from './pages/UserHomepage'
import CaptainHomepage from './pages/CaptainHomepage'
import UserProtected from './ProtectedRoute/UserProtected'
import CaptainProtected from './ProtectedRoute/CaptainProtected'
import Logout from './pages/Logout'

const App = () => {
  return (
    <Routes>
      {/* for usser  */}
      <Route path='/' element={<Home />} />
      <Route path='/userhome' element={
        // <UserProtected>
          <UserHomepage />
        // </UserProtected>
      } />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/otp-verify' element={<OTPVerify />} />

      {/* for captain  */}
      <Route path='/captainhomepage' element={
        <CaptainProtected>
          <CaptainHomepage />
        </CaptainProtected>
      } />
      <Route path='/captainlogin' element={<CaptainLogin />} />
      <Route path='/captainsignup' element={<CaptainSignup />} />

      <Route path='/logout' element={<Logout />} />
    </Routes>
  )
}

export default App