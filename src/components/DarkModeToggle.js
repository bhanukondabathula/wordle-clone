import React, { useEffect, useState } from "react";
import "../styles/DarkModeToggle.css";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
