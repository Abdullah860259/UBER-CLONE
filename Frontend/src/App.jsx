import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import UserRegister from './Pages/UserRegister'
import CaptainRegister from './Pages/CaptainRegister'
import DashBoard from './Pages/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'
import PubicRoute from './components/PubicRoute'
import OtpVerification from './Pages/OtpVerification'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-login" element={<PubicRoute><UserLogin /></PubicRoute>} />
      <Route path="/user-register" element={<PubicRoute><UserRegister /></PubicRoute>} />
      <Route path="/captain-login" element={<PubicRoute><CaptainLogin /></PubicRoute>} />
      <Route path="/captain-register" element={<PubicRoute><CaptainRegister /></PubicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
      <Route path="/otp-verification/:role" element={<OtpVerification />} />
    </Routes>
  )
}

export default App