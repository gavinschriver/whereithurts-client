import React from "react";

const LoadingWrapper = ({ children, text = "Please wait" }) => {
  return (
    <div className="loadingwrapper">
      {children}
      <div className="loadingwrapper__text">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default LoadingWrapper;
