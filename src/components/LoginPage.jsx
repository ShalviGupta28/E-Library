import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MainPage from "./MainPage";

const LoginPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    
    //Email or SSO Id
    const inputExp = /^[A-z]{10}$/.test(inputValue) ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
      
    if (inputValue.length === 0) {
      setInputError("Email/SSO Id is required");
      isValid = false;
    } else if (!inputExp) {
      setInputError(
        "SSO Id must be 10 alphabetic characters or Enter Valid Email"
      );
      isValid = false;
    } else {
      setInputError("");
    }

    //Password
    const uppercaseExp = /(?=.*?[A-Z])/;
    const lowercaseExp = /(?=.*?[a-z])/;
    const digitsExp = /(?=.*?[0-9])/;
    const specialCharExp = /(?=.*?[#?!@$%^&*-])/;

    if (password.length === 0) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be longer than 8 characters");
      isValid = false;
    } else if (password.length >= 20) {
      setPasswordError("Password must shorter than 20 characters");
      isValid = false;
    } else if (!password.match(lowercaseExp)) {
      setPasswordError("Password must contain at least one lowercase");
      isValid = false;
    } else if (!password.match(uppercaseExp)) {
      setPasswordError("Password must contain at least one capital letter");
      isValid = false;
    } else if (!password.match(digitsExp)) {
      setPasswordError("Password must contain at least one number");
      isValid = false;
    } else if (!password.match(specialCharExp)) {
      setPasswordError("Password must contain at least one special character");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };
  const loginHandler = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", inputValue);
      setShow(false);
      navigate("/ebook");
    }
  };
  return (
    <div className="login">
      {show ? (
        <>
          <Header />
          <div className="login-main-content">
            <form onClick={loginHandler}>
              <input
                type="text"
                placeholder="Email / SSO Id"
                value={inputValue}
                required
                className="login-field"
                onChange={(e) => {
                  setInputValue(e.target.value);
                  console.log(inputValue);
                }}
              />
              {inputError && <div className="login-error">{inputError}</div>}
              <br />
              <input
                type="password"
                required
                className="login-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <div className="login-error">{passwordError}</div>}
              <br />
              <button className="login-button">Log In</button>
            </form>
          </div>
        </>
      ) : (
        <MainPage />
      )}
    </div>
  );
};

export default LoginPage;
