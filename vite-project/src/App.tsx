
import './App.css'
import '@elastic/eui/dist/eui_theme_light.css';
import Header from './components/header/Header';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import Home from './components/home/Home';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import { EuiProvider} from '@elastic/eui';

function App() {


  return (
    <>
     <EuiProvider colorMode="light">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>

        </Routes>
        
        </BrowserRouter>
        </EuiProvider>
    </>
  )
}

export default App
