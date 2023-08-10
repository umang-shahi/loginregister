import React, { useState } from "react";
import "./signup.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { EuiLoadingSpinner,EuiForm,EuiFormRow,EuiButton,EuiFieldText, EuiFlexItem, EuiFlexGrid } from "@elastic/eui";

interface FormErrors {
  [key: string]: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validForm = (): boolean => {
    let newErrors: FormErrors = {};

    if (!firstName) {
      newErrors.firstName = "firstName is required";
    }

    if (!lastName) {
      newErrors.lastName = "lastName is required";
    }

    if (!email) {
      newErrors.email = "email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "password must be 5 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "confirmPassword is required";
    } else if (confirmPassword.length < 5) {
      newErrors.confirmPassword = "confirmPassword must be 5 characters";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "password must be match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(body);

    if (validForm()) {
      try {
        setIsLoading(true);
        const res = await axios.post("http://localhost:8000/register", body);
        console.log(res.data);
        
        if (res.data.success === true) {
          toast.success(res.data.message);

 
  

          console.log(res.data);
          setInterval(() => {
            navigate("/login");
          }, 2000);
          setIsLoading(false);
        }
      } catch (error: any) {
        const mssg = await error.res.data.message;
        toast.error(mssg);
       
        setIsLoading(false);
        setErrors({});
        console.log(error);
      }
    } else {
      return toast.error("Invalid form!");
    }
  };

  return (
    
     
    <div className="container">
    <h1 >SignUp</h1>
  
    
    <EuiForm component="form"  onSubmit={handleSubmit}>

      <EuiFlexGrid columns={2} direction="column" >


        <EuiFlexItem >
          <EuiFormRow label="First Name">
            <EuiFieldText
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="on"
              autoCorrect="on"
            />
          </EuiFormRow>
          {errors.firstName && (
            <span style={{ color: 'red' }}>{errors.firstName}</span>
          )}
          </EuiFlexItem>
          
       <EuiFlexItem>
          <EuiFormRow label="Last Name">
            <EuiFieldText
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="on"
              autoCorrect="on"
            />
          </EuiFormRow>
          {errors.lastName && (
            <span style={{ color: 'red' }}>{errors.lastName}</span>
          )}
        </EuiFlexItem>
      
      <EuiFlexItem>
      <EuiFormRow label="Email">
        <EuiFieldText
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
          autoCorrect="on"
        />
      </EuiFormRow>
      {errors.email && (
        <span style={{ color: 'red' }}>{errors.email}</span>
      )}
      </EuiFlexItem>
      <EuiFlexItem>
   
      <EuiFormRow label="Password">
        <EuiFieldText
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
          autoCorrect="on"
        />
      </EuiFormRow>
      {errors.password && (
        <span style={{ color: 'red' }}>{errors.password}</span>
      )}
    </EuiFlexItem>
    <EuiFlexItem>
      <EuiFormRow label="Confirm Password">
        <EuiFieldText
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="on"
          autoCorrect="on"
        />
      </EuiFormRow>
      {errors.confirmPassword && (
        <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
      )}
      </EuiFlexItem>
      <EuiFlexItem>
      
      <EuiFormRow>
        <EuiButton type="submit" fill>
          {isLoading && <EuiLoadingSpinner size="m" />} SignUp
        </EuiButton>
      </EuiFormRow>
      <EuiFormRow>
        <span>
          Already have an account?{' '}
          <NavLink style={{ textDecoration: 'none' }} to="/login">
            Login
          </NavLink>
        </span>
      </EuiFormRow>
      </EuiFlexItem>

      </EuiFlexGrid>

    </EuiForm>
   

  </div>
   
  );
};
export default SignUp;
