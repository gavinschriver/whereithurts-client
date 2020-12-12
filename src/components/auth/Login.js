import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthPage from "../layouts/AuthPage";
import { TextInput } from "../ui/TextInput";
import "./Auth.css";

const Login = (props) => {
  const [formValues, setFormValues] = useState({username:'', password:''});

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
        history.push("/")
    }
    else {
        alert('no bueno')
      }
  };

  return (
    <AuthPage>
      <main className="login">
        <form className="login__form">
          <TextInput
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
          <TextInput
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <button onClick={handleLogin}>Log in</button>
        </form>
        <Link to="/register">or Sign Up</Link>
      </main>
    </AuthPage>
  );
};

export default Login;
