import React, { useState } from "react";
import "./signup.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { EuiLoadingSpinner } from "@elastic/eui";

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
      <h1>SignUp</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your first Name "
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="on"
          autoCorrect="on"
        />
        {errors.firstName && (
          <span style={{ color: "red" }}>{errors.firstName}</span>
        )}
        <input
          type="text"
          placeholder="Enter your last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          autoComplete="on"
          autoCorrect="on"
        />
        {errors.lastName && (
          <span style={{ color: "red" }}>{errors.lastName}</span>
        )}
        <input
          type="text"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
          autoCorrect="on"
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        <input
          type="text"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
          autoCorrect="on"
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password}</span>
        )}
        <input
          type="text"
          placeholder="Confirm your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="on"
          autoCorrect="on"
        />
        {errors.confirmPassword && (
          <span style={{ color: "red" }}>{errors.confirmPassword}</span>
        )}

        <button type="submit">
          {" "}
          {isLoading && <EuiLoadingSpinner size="m" />}SignUp
        </button>
        <span>
          Already have an account?
          <NavLink style={{ textDecoration: "none" }} to="/login">
            Login
          </NavLink>
        </span>
      </form>
    </div>
  );
};
export default SignUp;
