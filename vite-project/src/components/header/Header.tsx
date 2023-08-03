
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
     <EuiAvatar size="s" name="home" imageUrl="https://w0.peakpx.com/wallpaper/45/583/HD-wallpaper-nature-landscape-landscape-nature.jpg" /> 

     </h2>
    </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
          <EuiHeaderSectionItemButton onClick={login}>Login</EuiHeaderSectionItemButton>
          <EuiHeaderSectionItemButton onClick={signUp}>SignUp</EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
      
    </EuiHeader>
  );
};