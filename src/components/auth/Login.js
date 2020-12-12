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
                  <TextInput name="email" value={"yo"} onChange={() => {}} />
                  <TextInput name="password" value={"hey"} onChange={() => {}}/>
        </form>
        <Link to="/register">Sign Up WHY NOT</Link>
      </main>
    </AuthPage>
  );
};

export default Login;
