import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPanelLogin.css";

export default function AdminPanelLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length < 5 || password.length < 5) {
      setError("Login and password should be at least 5 characters long.");
      return;
    }
    axios
      .post("http://localhost:5000/login", { userName, password })
      .then((response) => {
        console.log(response.data);
        const { error, token } = response.data;

        if (error) {
          setError(error);
        } else {
          localStorage.setItem("jwt", token);
          navigate("/admin-panel/editCoin");
          setError("Logged in");
          navigate("/admin-panel/editCoin");
        }
      })
      .catch((error) => {
        setError("Invalid login or password....");
        console.error(error);
      });
  };

  return (
    <>
      <h1 className="home-page-header">Admin Panel</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Username input */}
        <div className="login-input">
          <label htmlFor="login-input" className="label">
            Login
          </label>
          <input
            type="text"
            name="login"
            id="login-input"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="password">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="password-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <button className="sign-in-button" type="submit">
          Sign in
        </button>

        {/* Error message */}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </>
  );
}
