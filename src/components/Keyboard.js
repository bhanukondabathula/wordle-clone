import React from "react";
import "../styles/Keyboard.css";

const Keyboard = ({ input, setInput, handleSubmit, usedKeys }) => {
  const handleClick = (letter) => {
    if (letter === "Enter") handleSubmit();
    else if (letter === "Back") setInput((prev) => prev.slice(0, -1));
    else if (input.length < 5) setInput((prev) => prev + letter);
  };

  const keys = "qwertyuiopasdfghjklzxcvbnm".split("");

  return (
    <div className="keyboard-container">
      {keys.map((key) => (
        <button key={key} className={`key ${usedKeys[key] || "default-key"}`} onClick={() => handleClick(key)}>
          {key}
        </button>
      ))}
      <button className="key backspace-key" onClick={() => handleClick("Back")}>⌫</button>
      <button className="key enter-key" onClick={() => handleClick("Enter")}>Enter</button>
    </div>
  );
};

export default Keyboard;
