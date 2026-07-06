import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
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
import WaitingforDriver from './components/WaitingforDriver'
import DriverLocation from './pages/DriverLocation'
import CaptainHome from './pages/CaptainHome'
import Map from './pages/Map';

const App = () => {
  return (
    <Routes>
      {/* rredirect /user */}
      <Route path="/" element={<Navigate to="/user" replace />} />


      {/* for usser  */}
      <Route path='/user' element={<Home />} />
      <Route path='/captain' element={<CaptainHome />} />
      <Route path='/map' element={<Map />} />
      <Route path='/userhome' element={
        <UserProtected>
          <UserHomepage />
        </UserProtected>
      } />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/waitingfordriver' element={<WaitingforDriver />} />
      <Route path='/otp-verify' element={<OTPVerify />} />
      <Route path='/driverlocation' element={<DriverLocation />} />

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