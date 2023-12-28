import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import Input from "../../../components/Input/Input";
import useFetch from "../../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";
import "./create-user.css";
import { toast } from "react-toastify";
import SignImage from "../../../../public/assets/images/signup.jpg";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSuccess = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    toast.success(<div>User created successfully!</div>);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  const { error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    if (error == "User already exists") {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: { firstName, lastName, email, password } }),
    });
  };

  return (
    <div className="signup-container" data-testid={TEST_ID.container}>
      <Navbar />
      <div className="sign-up">
        <div className="signup-content">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h3>
              Already have a GymWhiz account?<Link to="/login">Log in</Link>.
            </h3>
            <p>Register with Email</p>
            <section className="signup-name">
              <Input
                className="signup-input"
                name={firstName}
                value={firstName}
                onChange={(value) => setFirstName(value)}
                data-testid={TEST_ID.firstNameInput}
                placeholder="Fist Name"
                type="text"
                required
                autoFocus
                maxLength="15"
              />

              <Input
                className="signup-input"
                name={lastName}
                value={lastName}
                onChange={(value) => setLastName(value)}
                data-testid={TEST_ID.lastNameInput}
                placeholder="Last Name"
                type="text"
                required
                maxLength="15"
              />
            </section>

            <section className="signup-email">
              <Input
                className="signup-input"
                name={email}
                value={email}
                onChange={(value) => setEmail(value)}
                data-testid={TEST_ID.emailInput}
                placeholder="Email"
                type="email"
                required
                maxLength="50"
              />
            </section>

            <section className="signup-password">
              <Input
                className="signup-input"
                name={password}
                value={password}
                onChange={(value) => setPassword(value)}
                data-testid={TEST_ID.passwordInput}
                placeholder="Password"
                type="password"
                required
              />
            </section>

            <button
              className="signup-btn"
              type="submit"
              data-testid={TEST_ID.submitButton}
            >
              Signup
            </button>

            <section className="terms">
              <input
                className="input-check"
                type="checkbox"
                name="terms"
                required
              />
              <label className="signup-label" htmlFor="terms">
                I agree with GymWhiz Terms & Conditions (required)
              </label>
            </section>
          </form>
        </div>
        <div className="signup-image">
          <img src={SignImage} alt="signup-img" />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
