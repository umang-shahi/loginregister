
import {
  EuiAvatar,
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton
} from '@elastic/eui';
import { useNavigate } from 'react-router-dom';



export default () => {

  const navigate = useNavigate();

  const login =()=>{
    navigate("/login")
          
  }

  const signUp=()=>{
   
    navigate("/signup")
   
  }


  return (
    <EuiHeader>
      
    <EuiHeaderSectionItem border="right">
    
     <h2>Home</h2>
    </EuiHeaderSectionItem>

   
    <EuiHeaderSectionItem border="left">
     <h2>Welcome
     <EuiAvatar size="s" name="home" imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" /> 

     </h2>
    </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
          <EuiHeaderSectionItemButton onClick={login}>Login</EuiHeaderSectionItemButton>
          <EuiHeaderSectionItemButton onClick={signUp}>SignUp</EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
      
    </EuiHeader>
  );
};