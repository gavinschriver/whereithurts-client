import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthPage from "../layouts/AuthPage";
import { TextInput } from "../ui/TextInput";
import "./Auth.css";

const Login = (props) => {

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <AuthPage>
      <main className="login">
        <form className="login__form">
                  <TextInput name="email" value={formValues.email} onChange={handleInputChange} />
                  <TextInput name="password" value={formValues.password} onChange={handleInputChange}/>
        </form>
        <Link to="/register">Sign Up WH DOO ITTT</Link>
      </main>
    </AuthPage>
  );
};

export default Login;
