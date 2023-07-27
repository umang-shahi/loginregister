
import {
  EuiAvatar,
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
} from '@elastic/eui';
import { useNavigate } from 'react-router-dom';



export default () => {

  const navigate = useNavigate();

  const login =()=>{
    navigate("/login")
          
  }

  const signUp=()=>{
   setInterval(()=>{
    navigate("/signup")
   })
  }


  return (
    <EuiHeader>
    <EuiHeaderSectionItem border="right">
     <h2>Home</h2>
    </EuiHeaderSectionItem>

   
    <EuiHeaderSectionItem border="left">
     <h2>Dog
     <EuiAvatar size="l" name="dog" imageUrl="https://images.freeimages.com/images/large-previews/3f8/dog-1383342.jpg" /> 

     </h2>
    </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
          <EuiHeaderSectionItemButton onClick={login}>Login</EuiHeaderSectionItemButton>
          <EuiHeaderSectionItemButton onClick={signUp}>SignUp</EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
      
    </EuiHeader>
  );
};