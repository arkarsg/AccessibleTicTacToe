import { useState } from "react";
import Tile from "./Tile";
import { drawCheck, winCheck } from "../utils/GameUtils";

const PLAYER_X = "X";
const PLAYER_O = "O";

const Board = ({tiles, handleTileClick}) => {
  return (
    <>
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
