import React from "react";

function Alert({ message, onClose }) {
  return (
    <div className="alert">
      <p className="alert-message">{message}</p>
      <button className="alert-button" onClick={onClose}>
        OK
      </button>
    </div>
  );
}

export default Alert;
