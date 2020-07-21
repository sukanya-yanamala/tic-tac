import React, { useState } from "react";
import Square from "./Square";
import "./game.css";

export default function Game() {
  const [player, setPlayer] = useState("X");
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState(["", "", "", "", "", "", "", "", ""]);
  const [win, setWin] = useState(false);
  const [winRows, setWinRows] = useState([-1, -1, -1]);

  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    let temp = history;
    if (!win && temp[index] === "") {
      temp[index] = player;
      setHistory(temp);
      let match = false;
      let ll = [-1, -1, -1];
      winnerLines.forEach((winnerLine) => {
        let line = winnerLine.map((j) => {
          return history[j];
        });
        if (line[0] === player && line[1] === player && line[2] === player) {
          match = true;
          ll = winnerLine;
          return;
        }
      });
      setWinRows(ll);
      setWin(match);
      setPlayer(match ? player : step % 2 === 0 ? "O" : "X");
      setStep(step + 1);
    }
  };

  const reset = () => {
    setPlayer("X");
    setStep(0);
    setHistory(["", "", "", "", "", "", "", "", ""]);
    setWin(false);
    setWinRows([-1, -1, -1]);
  };

  const renderSquare = (index) => {
    let className = "square ";
    if (winRows.some((i) => i === index)) {
      className += "active ";
    }
    if (history[index] === "") {
      className += "on ";
    } else {
      className += "off";
    }
    return (
      <Square
        active={className}
        value={history[index]}
        index={index}
        handleClick={handleClick}
      ></Square>
    );
  };

  return (
    <div>
      <div className="row">
        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
      </div>
      <div className="row">
        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
      </div>
      <div className="row">
        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
      </div>
      <div>
        <button onClick={reset}>Reset </button>
        <h3>Next Player: {player}</h3>
        <h4>Total steps: {step}</h4>
        <h2>Status {win ? player + "-WON" : "playing"}</h2>
      </div>
    </div>
  );
}
