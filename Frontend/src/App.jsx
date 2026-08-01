import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import UserRegister from './Pages/UserRegister'
import CaptainRegister from './Pages/CaptainRegister'
import DashBoard from './Pages/DashBoard'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-register" element={<CaptainRegister />} />
      <Route path="/dashboard" element={ <ProtectedRoute><DashBoard /></ProtectedRoute> } />
    </Routes>
  )
}

export default App