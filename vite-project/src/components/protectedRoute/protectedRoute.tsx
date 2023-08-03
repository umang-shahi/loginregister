import React from "react";
import { Navigate} from "react-router-dom";


const ProtectedRoute:React.FC = ( props:any) => {
  let auth = localStorage.getItem("token");

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return( 
    <React.Fragment>
      {
        props ? props.children : null
      }
    </React.Fragment>
  )
};

export default ProtectedRoute;


