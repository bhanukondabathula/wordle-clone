import React from "react";
import "../styles/GameModal.css";

const GameModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: message.text }}></p>
        <button onClick={onClose} className="modal-close">
          {message.buttonText}
        </button>
      </div>
    </div>
  );
};

export default GameModal;
