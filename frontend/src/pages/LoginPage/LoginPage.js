import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate()
  const [user] = useAuth()
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );
  const [seePass, setSeePass] = useState(true)

  useEffect(() => {
    checkIfUser()
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  function checkIfUser() {
    user ? (navigate('/'))
    : (null)
  }
  function setPassVisibility () {
    if (seePass === false){
      setSeePass(true)
    }
    else{
      setSeePass(false)
    }
  }
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <div>
            <input
              type={seePass ? 'password' : 'text'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
              <i
              onClick={setPassVisibility}
              className = {`bi ${seePass ? 'bi-eye-slash' : 'bi-eye'}`}>
              </i>
          </div>
        </label>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link to="/register">Click to register!</Link>
        <button>Login!</button>
      </form>
    </div>
  );
};

export default LoginPage;
