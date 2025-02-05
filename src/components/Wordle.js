import React, { useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import DarkModeToggle from "./DarkModeToggle";
import GameModal from "./GameModal";
import "../styles/Wordle.css";

const VALID_WORDS = ["apple", "grape", "table", "chair", "spoon", "cloud", "house", "bread", "light", "sound"];

const getRandomWord = () => VALID_WORDS[Math.floor(Math.random() * VALID_WORDS.length)];

const Wordle = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord);
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const [modalData, setModalData] = useState({ isOpen: false, title: "", text: "", buttonText: "Close" });

  const handleSubmit = useCallback(() => {
    if (input.length !== 5 || !VALID_WORDS.includes(input)) {
      setModalData({ isOpen: true, title: "❌ Invalid Word!", text: "Try a valid 5-letter word.", buttonText: "OK" });
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
      setModalData({ isOpen: true, title: "🎉 You Win!", text: "Congratulations! You guessed the word.", buttonText: "Play Again" });
      setGameOver(true);
    } else if (guesses.length === 5) {
      setModalData({
        isOpen: true,
        title: "❌ Game Over!",
        text: `The word was <span class="correct-word">${targetWord}</span>`,
        buttonText: "Try Again",
      });
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

  const handleHint = () => {
    if (!gameOver) {
      setModalData({
        isOpen: true,
        title: "💡 Need a Hint?",
        text: `Hint: The first letter is "<strong>${targetWord[0]}</strong>"`,
        buttonText: "Got It!",
      });
    }
  };

  const handleNewGame = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setInput("");
    setGameOver(false);
    setUsedKeys({});
    setModalData({ isOpen: false, title: "", text: "", buttonText: "Close" });
  };

  return (
    <div className="wordle-container">
      <h1 className="title">Wordle Clone</h1>
      <DarkModeToggle />
      <Grid guesses={guesses} input={input} />
      <Keyboard input={input} setInput={setInput} handleSubmit={handleSubmit} usedKeys={usedKeys} />
      
      <button onClick={handleHint} className="hint-button">Get Hint</button>
      <button onClick={handleNewGame} className="new-game">🔄 New Game</button>

      {/* Modal for Hints, Game Over, and Invalid Words */}
      <GameModal isOpen={modalData.isOpen} message={modalData} onClose={handleNewGame} />
    </div>
  );
};

export default Wordle;
