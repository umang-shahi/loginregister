import React ,{useState} from 'react';
import "./login.scss";
import { NavLink } from 'react-router-dom';
import {toast} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";


import { EuiLoadingSpinner } from "@elastic/eui";


interface FormErrors {
  [key: string]: string;
}

const Login: React.FC = () => {

    const navigate = useNavigate();
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = ():boolean => {
    let newErrors:FormErrors = {};
    if (!email) {
      newErrors.email = "email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = "Invalid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "Password must be 5 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        const res = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
        console.log(res)
        if (res.data.role === "admin") {
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/admin/dashboard");
          
          setIsLoading(false);
        }else{
          toast.success(res.data.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/profile");
          

          setIsLoading(false);

        }
      } catch (error:any) {
        const msg = await error.response.data.message;
        toast.error(msg);
        setErrors({});
        setIsLoading(false);
      }
    } else {
      return toast.error("Invalid form!");
    }
  };

  return(
    
      
        <div className="login">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

            <input type="text" placeholder="Enter your Email" value={email}
            
              onChange={(e) => setEmail(e.target.value)}/>

               {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
            
            <input type="text" placeholder="Enter your Password" value={password}
             
              
              onChange={(e) => setPassword(e.target.value)}/>
              
               {errors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}

            <button type='submit'> {""} {isLoading && <EuiLoadingSpinner size="m"/>}Login</button> 
            
           <br/>
            <span>
                Don't have an account?
                <NavLink style={{ textDecoration: "none" }} to="/register">
                  Register
                </NavLink>
              </span>
              </form>
            </div>


               
  
  );
               };
              export default Login;