import React, { useState, useEffect } from 'react';
import './App.css';
import SquareComponent from "./SquareComponent";

/**
 * This functional component is rendered in the root div
 * It renders the tic-tac-toe board and all the logic is present in this component
 */
function App() {
  const [gameState, updateGameState] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [isXChance, updateIsXChance] = useState(false);

  /**
   * This function handles the clicking of the square component boxes
   * @param {*} index 
   * @param {*} index1 
   */
  const handleSquareClicked = (index, index1) => {
    let gameStateArray = [...gameState];
    gameStateArray[index][index1] = isXChance ? "X" : "0";
    updateGameState(gameStateArray);
    updateIsXChance(!isXChance);
  }


  useEffect(() => {
    const winner = checkWinner();
    const isDraw = checkDraw();

    /** If we have found a winner */
    if (winner) {
      alert(`Congratulations! "${winner}" has won the Game`);
      updateGameState([["", "", ""], ["", "", ""], ["", "", ""]]);
    }
    /** If the game is draw */
    else if (isDraw) {
      alert(`The Game is draw`);
      updateGameState([["", "", ""], ["", "", ""], ["", "", ""]]);
    }
  }, [gameState])// eslint-disable-line react-hooks/exhaustive-deps

  /**
   * This function checks whether the game has been draw or not
   */
  const checkDraw = () => {
    let result = false;
    for (let count = 0; count < gameState.length; count++) {
      result = gameState[count].every(function (e) {
        return e !== "";
      });
    }
    return result;
  }

  /**
   * This function checks whether we have found a winner or not
   */
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

  /** Renders the HTML */
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

/** Export the component */
export default App;
