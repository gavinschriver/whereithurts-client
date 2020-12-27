import React from "react";
/**
 * 
 * @param {Function} onClose function to toggle the diplay state of the Modal to "false" 
 */
const Modal = ({ children, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
