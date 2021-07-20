import React, { useState, useEffect } from 'react';
import './App.css';
import SquareComponent from "./SquareComponent";
function App() {
  const [gameState, updateGameState] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [isXChance, updateIsXChance] = useState(false);
  const handleSquareClicked = (index, index1) => {
    let gameStateArray = [...gameState];
    gameStateArray[index][index1] = isXChance ? "X" : "0";
    updateGameState(gameStateArray);
    updateIsXChance(!isXChance);
  }

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      alert(`Congratulations! "${winner}" has won the Game`);
      updateGameState([["", "", ""], ["", "", ""], ["", "", ""]]);
    }
  }, [gameState])

  const checkWinner = () => {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];
    for (let count = 0; count < lines.length; count++) {
      const [a, b, c] = lines[count];
      const aX = a[0];
      const aY = a[1];
      const bX = b[0];
      const bY = b[1];
      const cX = c[0];
      const cY = c[1];
      if (gameState[aX][aY] && gameState[aX][aY] === gameState[bX][bY] && gameState[aX][aY] === gameState[cX][cY]) {
        return gameState[aX][aY];
      }
    }
    return null;
  }

  return (
    <div className="app-header">
      <p className="heading-text">React Tic-Tac-Toe</p>
      <React.Fragment>
        {
          gameState.map((squareState, index) => {
            return <div className="row jc-center">
              {squareState.map((individualSquare, index1) => {
                const classes = index === 2 ? "b-right" : index1 === 2 ? "b-bottom" : "b-bottom-right";
                const finalClasses = index === 2 && index1 === 2 ? "" : classes;
                return <SquareComponent className={finalClasses} squareState={individualSquare} onClickSquare={() => handleSquareClicked(index, index1)} />
              })
              }
            </div>
          })
        }
      </React.Fragment>
      <button className="clear-button" onClick={() => updateGameState([["", "", ""], ["", "", ""], ["", "", ""]])}>Clear Game</button>
    </div >
  );
}

export default App;
