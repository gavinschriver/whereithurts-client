import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthPage from "../layouts/AuthPage";
import Button from "../ui/Button";
import { TextInput } from "../ui/TextInput";
import "./Auth.css";

const Register = (props) => {

  //import the Router history object
  const history = useHistory()

  // initialize form values
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    password_repeat:""
  });

  // handle all field changes 

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })

  // after updating state value object, if the target was the password_repeat field and the value
  //was not an empty string and isn't equal to the password, show the alert. Inverse of those conditions removes alert

    if (name === "password_repeat" && value !== formValues.password && value !== '') {
      setShowPasswordAlert(true)
    }
    if (name === "password_repeat" && (value === formValues.password || value === '')) {
      setShowPasswordAlert(false)
    }
  }

  //whenver formValues gets updated, check and see if there are non-empty values for all fields and that password and password_repeat are the same 
  // If so, enable the register button
  useEffect(() => {
    if ((!Object.values(formValues).includes('')) && (formValues.password === formValues.password_repeat)) {
      setRegisterButtonEnabled(true)
    }
    else setRegisterButtonEnabled(false)
  }, [formValues])

  // boolean to conditionally render the "Passwords Do Not Match" alert
  const [showPasswordAlert, setShowPasswordAlert] = useState(false)  
  const [registerButtonEnabled, setRegisterButtonEnabled] = useState(false)
  
  //handle Register submission 
  const handleRegister = async e => {
    e.preventDefault()
    const newUser = {
      username: formValues.username,
      email: formValues.email,
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      password: formValues.password,
    }

    const res = await fetch(`https://gavinschriver.pythonanywhere.com/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const json = await res.json();
    if ("valid" in json && json.valid && "token" in json) {
      localStorage.setItem("patient_token", json.token);
      localStorage.setItem("patient_id", json.patient_id)
      history.push("/");
    } else {
      alert("Invalid Login");
    }
  }

  return (
    <AuthPage>
      <main className="register">
        <div className="authwrapper">
          <div className="authcontent">
            <form className="auth__form">
              <h1>Sign Up</h1>
              <TextInput placeholder="First Name" name="firstname" value={formValues.firstname} onChange={handleInputChange} />
              <TextInput placeholder="Last Name" name="lastname" value={formValues.lastname} onChange={handleInputChange} />
              <TextInput placeholder="Email" name="email" value={formValues.email} onChange={handleInputChange} />
              <TextInput placeholder="User Name" name="username" value={formValues.username} onChange={handleInputChange} />
              <TextInput placeholder="Password" type="password" name="password" value={formValues.password} onChange={handleInputChange} />
              <TextInput placeholder="Re-enter Password" type="password" name="password_repeat" value={formValues.password_repeat} onChange={handleInputChange} />
              {showPasswordAlert && <div className="password_alert"><p>Passwords Do Not Match</p></div>}
              <Button disabled={!registerButtonEnabled} onClick={handleRegister}>Register Account</Button>
            </form>
          </div>
        </div>
      </main>
    </AuthPage>
  );
};

export default Register;
