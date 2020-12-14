import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthPage from "../layouts/AuthPage";
import Button from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import "./Auth.css";

const Login = (props) => {
  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formValues,
      }),
    });
    const json = await res.json();
    if ("valid" in json && json.valid && "token" in json) {
      localStorage.setItem("patient_token", json.token);
      history.push("/");
    } else {
      alert("no bueno");
    }
  };

  return (
    <AuthPage>
      <main className="login">
        <div className="authwrapper">
          <h1>Log In</h1>
          <div className="authcontent">
            <form className="auth__form">
              <TextInput
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
              <TextInput
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              <Button onClick={handleLogin}>Log In</Button>
            </form>
          </div>
          <div className="authcontent">
            <h3>
              or <Link to="/register">Sign Up</Link>
            </h3>
          </div>
        </div>
      </main>
    </AuthPage>
  );
};

export default Login;
