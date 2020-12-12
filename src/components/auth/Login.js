import React from "react";
import { Link } from "react-router-dom";
import AuthPage from "../layouts/AuthPage";
import "./Auth.css";

const Login = (props) => {
  return (
    <AuthPage>
      <main className="login">
        <Link to="/register">Sign Up WHY NOT</Link>
      </main>
    </AuthPage>
  );
};

export default Login