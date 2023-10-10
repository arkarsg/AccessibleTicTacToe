import { useState } from "react";
import Tile from "./Tile";
import { drawCheck, winCheck } from "../utils/GameUtils";

const PLAYER_X = "X";
const PLAYER_O = "O";

const Board = ({}) => {
  const [isActive, setIsActive] = useState(true);
  const [player, setPlayer] = useState(PLAYER_X);
  const [tiles, setTiles] = useState(Array(9).fill(""));

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
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Tile onClick={() => handleTileClick(0)} value={tiles[0]} />
        <Tile onClick={() => handleTileClick(1)} value={tiles[1]} />
        <Tile onClick={() => handleTileClick(2)} value={tiles[2]} />
        <Tile onClick={() => handleTileClick(3)} value={tiles[3]} />
        <Tile onClick={() => handleTileClick(4)} value={tiles[4]} />
        <Tile onClick={() => handleTileClick(5)} value={tiles[5]} />
        <Tile onClick={() => handleTileClick(6)} value={tiles[6]} />
        <Tile onClick={() => handleTileClick(7)} value={tiles[7]} />
        <Tile onClick={() => handleTileClick(8)} value={tiles[8]} />
      </div>
    </>
  );
};

export default Board;
