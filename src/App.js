import React, { useState, useEffect } from 'react';
import './App.css';
import SquareComponent from "./SquareComponent";
const initialGameState = ["", "", "", "", "", "", "", "", ""];
function App() {
  const [gameState, updateGameState] = useState(initialGameState);
  const [isXChance, updateIsXChance] = useState(false);
  const handleSquareClicked = (index) => {
    let gameStateArray = [...gameState];
    gameStateArray[index] = isXChance ? "X" : "0";
    updateGameState(gameStateArray);
    updateIsXChance(!isXChance);
  }

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      alert(`Congratulations! "${winner}" has won the Game`);
      updateGameState(initialGameState);
    }
  }, [gameState])

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let count = 0; count < lines.length; count++) {
      const [a, b, c] = lines[count];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a];
      }
    }
    return null;
  }

  return (
    <div className="app-header">
      <p className="heading-text">React Tic-Tac-Toe</p>
      <div className="row jc-center">
        <SquareComponent className="b-bottom-right" squareState={gameState[0]} onClickSquare={() => handleSquareClicked(0)} />
        <SquareComponent className="b-bottom-right" squareState={gameState[1]} onClickSquare={() => handleSquareClicked(1)} />
        <SquareComponent className="b-bottom" squareState={gameState[2]} onClickSquare={() => handleSquareClicked(2)} />
      </div>
      <div className="row jc-center">
        <SquareComponent className="b-bottom-right" squareState={gameState[3]} onClickSquare={() => handleSquareClicked(3)} />
        <SquareComponent className="b-bottom-right" squareState={gameState[4]} onClickSquare={() => handleSquareClicked(4)} />
        <SquareComponent className="b-bottom" squareState={gameState[5]} onClickSquare={() => handleSquareClicked(5)} />
      </div>
      <div className="row jc-center">
        <SquareComponent className="b-right" squareState={gameState[6]} onClickSquare={() => handleSquareClicked(6)} />
        <SquareComponent className="b-right" squareState={gameState[7]} onClickSquare={() => handleSquareClicked(7)} />
        <SquareComponent squareState={gameState[8]} onClickSquare={() => handleSquareClicked(8)} />
      </div>
      <button className="clear-button" onClick={() => updateGameState(initialGameState)}>Clear Game</button>
    </div>
  );
}

export default App;
