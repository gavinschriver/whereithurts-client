import React from "react";
/**
 *
 * @param {Function} onClose function to toggle the diplay state of the Modal to "false"
 */
const Modal = ({ children, onClose, showing }) => {

  return (
    <div
      className={showing ? "overlay " : "overlay hidden-overlay"}
      onClick={onClose}
    >
      <div className={showing ? "modal" : "hidden-modal"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
