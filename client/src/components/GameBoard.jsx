import { useState } from "react";
import Board from "./Board";
import { drawCheck, winCheck } from "../utils/GameUtils";

const PLAYER_X = "X";
const PLAYER_O = "O";

const GameBoard = () => {
  const [tiles, setTiles] = useState(Array(9).fill(""));
  const [isActive, setIsActive] = useState(true);
  const [player, setPlayer] = useState(PLAYER_X);
  let status;

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

    if (winCheck(nextTiles, player) || drawCheck(nextTiles)) {
      setIsActive(false);
      return;
    }
    const nextPlayer = player === PLAYER_X ? PLAYER_O : PLAYER_X;
    setPlayer(nextPlayer);
  }

  if (winCheck(tiles, player)) {
    status = `Winner ${player}`;
  } else if (drawCheck(tiles)) {
    status = "Game ended in a draw";
  } else {
    const nextPlayer = player === PLAYER_X ? PLAYER_X : PLAYER_O;
    status = "Next player: " + nextPlayer;
  }

  return (
    <div>
      <h1>Accessible Tic Tac Toe for screen readers</h1>
      <Board tiles={tiles} handleTileClick={handleTileClick} />
    </div>
  );
};

export default GameBoard;
