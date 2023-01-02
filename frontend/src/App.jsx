import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from "./pages/MainPage";
import EmailCancellation from "./pages/EmailCancellation";


function App() {
  return (
    <div className="min-h-full h-screen flex  justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path="/a" element={<LoginPage/>} />
            <Route path="/" element={<EmailCancellation/>} />
       
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  </div>
  
  )
}

export default App
