import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });

  const { email, password, name, mobile } = inputValue;
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const validateForm = () => {
    let isValid = true;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      handleError("Please enter a valid email address");
      isValid = false;
    }

    if (!name.trim()) {
      handleError("Please enter a username");
      isValid = false;
    }

    if (password.length < 6) {
      handleError("Password must be at least 6 characters");
      isValid = false;
    }

    // Basic mobile number validation
    const mobileRegex = /^[0-81]{10}$/; // Assuming a 10-digit number format
    if (!mobileRegex.test(mobile)) {
      handleError("Please enter a valid 10-digit mobile number");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/signup`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      handleError("An error occurred during signup");
    }

    setInputValue({
      email: "",
      password: "",
      name: "",
      mobile: "",
    });
  };
 
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="form_container " style={{ marginTop: "170px" }}>
        <h2>Register Account</h2>
        <form onSubmit={handleSubmit} className="my-5">
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
            {errors.email && (
              <span className="error" style={{ color: "red" }}>
                {errors.email}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={handleOnChange}
            />
            {errors.name && (
              <span className="error" style={{ color: "red" }}>
                {errors.name}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={mobile}
              placeholder="Enter your mobile number"
              onChange={handleOnChange}
            />
            {errors.mobile && (
              <span className="error" style={{ color: "red" }}>
                {errors.mobile}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
              <span>
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                >
                  {/* {showPassword ? <FaEye /> : <FaEyeSlash />} */}
                </button>
              </span>
            </div>
            {errors.password && (
              <span className="error" style={{ color: "red" }}>
                {errors.password}
              </span>
            )}
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
