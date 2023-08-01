import  { ReactElement } from 'react';
import {  EuiImage} from '@elastic/eui';



export default ({
  
 

}: {
  content: ReactElement;
  extendedBorder?: boolean;
  restrictWidth?: boolean;
  centeredContent?: boolean;
}) => {
  
  return (
    <>

      <EuiImage
   margin="xl"
  alt={"umang"}
  src={"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"}
/>
    </>
  );

  } 