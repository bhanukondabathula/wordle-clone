import React, { useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/Wordle.css";

const VALID_WORDS = ["apple", "grape", "table", "chair", "spoon", "cloud", "house", "bread", "light", "sound"];

const getRandomWord = () => VALID_WORDS[Math.floor(Math.random() * VALID_WORDS.length)];

const Wordle = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord);
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const [hint, setHint] = useState("");

  // Memoize handleSubmit to avoid unnecessary re-renders
  const handleSubmit = useCallback(() => {
    if (input.length !== 5 || !VALID_WORDS.includes(input)) {
      setMessage("❌ Invalid word!");
      return;
    }

    const feedback = input.split("").map((char, i) =>
      targetWord[i] === char ? "green" : targetWord.includes(char) ? "yellow" : "gray"
    );

    setGuesses((prevGuesses) => [...prevGuesses, { word: input, feedback }]);

    setUsedKeys((prevKeys) => {
      const updatedKeys = { ...prevKeys };
      input.split("").forEach((letter, i) => {
        updatedKeys[letter] = feedback[i];
      });
      return updatedKeys;
    });

    setInput("");

    if (input === targetWord) {
      setMessage("🎉 You Win!");
      setGameOver(true);
    } else if (guesses.length === 5) {
      setMessage(
        `❌ Game Over! The word was <span class="correct-word">${targetWord}</span>`
      );

      setGameOver(true);
    }
  }, [input, targetWord, guesses.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;
      if (e.key === "Enter" && input.length === 5) handleSubmit();
      if (e.key === "Backspace") setInput((prev) => prev.slice(0, -1));
      if (/^[a-z]$/.test(e.key) && input.length < 5) setInput((prev) => prev + e.key);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [input, gameOver, handleSubmit]);

  // Disable ESLint warning since checkGuess might be used later
  // eslint-disable-next-line no-unused-vars
  const checkGuess = (guess) => {
    let updatedKeys = { ...usedKeys };
    return guess.split("").map((char, index) => {
      if (char === targetWord[index]) {
        updatedKeys[char] = "green";
        return "green";
      }
      if (targetWord.includes(char)) {
        updatedKeys[char] = "yellow";
        return "yellow";
      }
      updatedKeys[char] = "gray";
      return "gray";
    });
  };

  const handleHint = () => {
    if (!gameOver && targetWord) {
      setHint(`Hint: The first letter is "${targetWord[0]}"`);
    }
  };

  // Disable ESLint warning since handleNewGame is used in JSX
  // eslint-disable-next-line no-unused-vars
  const handleNewGame = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setInput("");
    setMessage("");
    setGameOver(false);
    setUsedKeys({});
    setHint("");
  };

  return (
    <div className="wordle-container">
      <h1 className="title">Wordle Clone</h1>
      <DarkModeToggle />
      <Grid guesses={guesses} input={input} />
      <Keyboard input={input} setInput={setInput} handleSubmit={handleSubmit} usedKeys={usedKeys} />
      <p className="message">{message}</p>
      <button onClick={handleHint} className="hint-button">
        Get Hint
      </button>
      {hint && <p className="hint-text">{hint}</p>}
      <button onClick={handleNewGame} className="new-game">🔄 New Game</button>
    </div>
  );
};

export default Wordle;
