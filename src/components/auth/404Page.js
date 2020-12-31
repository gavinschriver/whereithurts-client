import React from "react";
import AuthPage from "../layouts/AuthPage";

const FourOhFourPage = (props) => {
  return (
    <>
      <AuthPage>
        <div className="authwrapper">
                  <h1>Sorry, the thing you're looking for can't be located.</h1>
        </div>
      </AuthPage>
    </>
  );
};

export default FourOhFourPage;
