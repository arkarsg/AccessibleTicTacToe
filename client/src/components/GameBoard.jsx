import { useState } from "react";
import Board from "./Board";
import { drawCheck, winCheck } from "../utils/GameUtils";

const PLAYER_X = "X";
const PLAYER_O = "O";

const GameBoard = () => {
  const [tiles, setTiles] = useState(Array(9).fill(""));
  const [isActive, setIsActive] = useState(true);
  const [player, setPlayer] = useState(PLAYER_X);
  const [gameStatus, setGameStatus] = useState("");

  function handleTileClick(i) {
    if (tiles[i] !== "") {
      return;
    }
    if (!isActive) {
      return;
    }

    const nextTiles = tiles.slice();
    if (player === PLAYER_X) {
      nextTiles[i] = PLAYER_X;
    } else {
      nextTiles[i] = PLAYER_O;
    }
    setTiles(nextTiles);

    if (winCheck(nextTiles, player)) {
      const winStatus = `Winner: ${player}`;
      setGameStatus(winStatus);
      setIsActive(false);
      return;
    } else if (drawCheck(nextTiles)) {
      const drawStatus = "Game ended in a draw";
      setGameStatus(drawStatus);
      setIsActive(false);
      return;
    }

    const nextPlayer = player === PLAYER_X ? PLAYER_O : PLAYER_X;
    setPlayer(nextPlayer);
  }

  function handleReset() {
    setTiles(Array(9).fill(""));
    setIsActive(true);
    setPlayer(PLAYER_X);
    setGameStatus("");
  }

  return (
    <div>
      <h1>Accessible Tic Tac Toe for screen readers</h1>
      <Board tiles={tiles} handleTileClick={handleTileClick} />
      <h2>{gameStatus}</h2>
      <h2>{player}</h2>
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default GameBoard;
