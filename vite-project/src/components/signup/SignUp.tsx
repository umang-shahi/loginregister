
import "./signup.scss";
import { NavLink } from "react-router-dom";


function SignUp(){
    return(
     <div className="container">
        <h1>Sign Up</h1>
        <form>
            <input type="text" placeholder="Enter your first Name "/>
            <input type="text" placeholder="Enter your last Name"/>
            <input type="text" placeholder="Enter your Email"/>
            <input type="text" placeholder="Enter your Password"/>
            <input type="text" placeholder="Confirm your Password"/>

        
        <button>SignUp</button>
        <span>
                Already have an account?
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  Login
                </NavLink>
              </span>
        </form>
     </div>
    )
}

export default SignUp;