import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthPage from "../layouts/AuthPage";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import "./Auth.css";

const Login = (props) => {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [alertShowing, setAlertShowing] = useState(false);

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
    const res = await fetch(`https://gavinschriver.pythonanywhere.com/login`, {
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
      localStorage.setItem("patient_id", json.patient_id);
      history.push("/");
    } else {
      setAlertShowing(true);
    }
  };

  return (
    <AuthPage>
      <main className="login">
        <div className="authwrapper">
          <h1>Log In</h1>
          {alertShowing && (
            <Alert onClose={() => setAlertShowing(false)}>
              Invalid login attempt.
            </Alert>
          )}
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
