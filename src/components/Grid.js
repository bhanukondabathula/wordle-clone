import React from "react";
import "../styles/Grid.css";

const Grid = ({ guesses, input }) => {
  return (
    <div className="grid-container">
      {Array.from({ length: 6 }).map((_, row) => (
        <div className="grid-row" key={row}>
          {Array.from({ length: 5 }).map((_, col) => {
            const guess = guesses[row] || {};
            return (
              <div key={col} className={`grid-cell ${guess.feedback ? guess.feedback[col] : ""}`}>
                {guess.word ? guess.word[col] : (row === guesses.length ? input[col] || "" : "")}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
