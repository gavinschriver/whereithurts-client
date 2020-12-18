import React from "react";
import AuthPage from "../layouts/AuthPage";
import { NavBar } from "../nav/NavBar";

const FourOhFourPage = (props) => {
  return (
    <>
      <NavBar />
      <AuthPage>
        <div className="authwrapper">
                  <h1>Sorry, the thing you're looking for can't be located.</h1>
        </div>
      </AuthPage>
    </>
  );
};

export default FourOhFourPage;
