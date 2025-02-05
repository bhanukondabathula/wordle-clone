import React from "react";
import Wordle from "./components/Wordle"; 
import "./styles/animations.css"; 
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Wordle />
    </div>
  );
};

export default App;
