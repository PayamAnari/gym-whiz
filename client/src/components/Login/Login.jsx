import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginImg from "../../../public/assets/images/login.jpg";
import "./Login.css";
import useFetch from "../../hooks/useFetch";
import Input from "../Input/Input";
import Navbar from "../Navbar/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSuccess = (userData) => {
    login(userData.user);
    toast.success(
      <div>
        Hey {userData.user.firstName}!
        <br /> You logged in successfully.
      </div>
    );
    setTimeout(() => {
      navigate("/");
    }, 2000);
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  const { performFetch, cancelFetch, error } = useFetch(
    "/user/login",
    onSuccess
  );

  useEffect(() => {
    return () => cancelFetch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user: { email, password } }),
      });
    }, 2000);
  };

  useEffect(() => {
    if (error === "Invalid credentials!") {
      toast.error(
        <div>
          Invalid email or password. <br /> Please try again!
        </div>
      );
    }

    setLoading(false);
  }, [error]);

  return (
    <div className="login-container">
      <Navbar />
      <section className="login-wrapper">
        <div className="login">
          <h1 className="title">Log In with your e-mail</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <Input
              className="input"
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <Input
              className="input"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
            {/* {error ? <p className="error-message">{errorMessage}</p> : null} */}
          </form>
        </div>
        <div className="login-image">
          <img src={LoginImg} alt="login-img" />
        </div>
      </section>
    </div>
  );
};

export default Login;
