import { useState } from "react";
import Board from "./Board";

const PLAYER_X = "X";
const PLAYER_O = "O";

const GameBoard = () => {
  const [tiles, setTiles] = useState(Array(9).fill(""));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);

  const handleTileClick = (index) => {
    if (tiles[index] !== "") {
      return;
    }
    // create a copy of the tiles
    const newTiles = [...tiles];
    // set the selected tile to playerTurn
    newTiles[index] = playerTurn;
    setTiles(newTiles);

    // switch sides
    playerTurn === PLAYER_X
      ? setPlayerTurn(PLAYER_O)
      : setPlayerTurn(PLAYER_X);

    console.log(index);
  };

  return (
    <div>
      <h1>Accessible Tic Tac Toe for screen readers</h1>
      <Board tiles={tiles} onTileClick={handleTileClick} />
    </div>
  );
};

export default GameBoard;
