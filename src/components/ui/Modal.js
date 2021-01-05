import React from "react";
/**
 * 
 * @param {Function} onClose function to toggle the diplay state of the Modal to "false" 
 */
const Modal = ({ children, className}) => {
  return (
      <div className={className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
  );
};

export default Modal;
