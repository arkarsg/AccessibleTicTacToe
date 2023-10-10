import Tile from "./Tile";

const Board = ({ tiles, onTileClick }) => {
  return (
    <div className="board">
      <Tile onClick={() => onTileClick(0)} value={tiles[0]} />
      <Tile onClick={() => onTileClick(1)} value={tiles[1]} />
      <Tile onClick={() => onTileClick(2)} value={tiles[2]} />
      <Tile onClick={() => onTileClick(3)} value={tiles[3]} />
      <Tile onClick={() => onTileClick(4)} value={tiles[4]} />
      <Tile onClick={() => onTileClick(5)} value={tiles[5]} />
      <Tile onClick={() => onTileClick(6)} value={tiles[6]} />
      <Tile onClick={() => onTileClick(7)} value={tiles[7]} />
      <Tile onClick={() => onTileClick(8)} value={tiles[8]} />
    </div>
  );
};

export default Board;
