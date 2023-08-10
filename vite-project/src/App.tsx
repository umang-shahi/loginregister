import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import Admin from "./components/admin/Admin";
import Profile from "./components/profile/Profile";
import Home from './components/home/Home';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import { EuiProvider } from '@elastic/eui';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const App: React.FC<void> = () => {
  return (
    <>
      <EuiProvider colorMode="light">
        <BrowserRouter>
        <ToastContainer position = "bottom-right" />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            

            
            

          
           <Route path= "/profile" element = {<ProtectedRoute>{<Profile/>}</ProtectedRoute>}/>
           

  
          
            <Route path="/admin/dashboard" element={<ProtectedRoute>{<Admin/>}</ProtectedRoute>}/>

           
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </EuiProvider>
    </>
  );
};

export default App;
