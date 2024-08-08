import React from "react";
import "./custom-modal.css"; // Create this CSS file for custom styles

const CustomModal = ({ isOpen, onClose, children }) => {
  const modalStyle = {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.5)",
  };

  return (
    <div
      className={`custom-modal-overlay ${isOpen ? "show" : ""}`}
      onClick={onClose}
    >
      <div
        className="custom-modal"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
