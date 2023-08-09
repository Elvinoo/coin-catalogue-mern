import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/AdminPanelLogin.css";
import axios from "axios";
export default function AdminPanelLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:5000/register", {
        login: userName,
        password,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          navigate("/admin-panel/editCoin");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <h1 className="home-page-header">Admin Panel</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <div className="password">
          <label htmlFor="confirm-password" className="label">
            Confirm Password
          </label>
          <input
            className="password-input"
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="sign-in-button" type="submit">
          Register
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </>
  );
}
