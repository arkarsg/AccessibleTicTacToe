import Tile from "./Tile";

const Board = ({tiles, handleTileClick}) => {
  return (
    <>
      <div className="grid grid-cols-3 mx-auto w-64 border-black border-solid border-2">
        <Tile onClick={() => handleTileClick(0)} value={tiles[0]} id={1}/>
        <Tile onClick={() => handleTileClick(1)} value={tiles[1]} id={2}/>
        <Tile onClick={() => handleTileClick(2)} value={tiles[2]} id={3}/>
        <Tile onClick={() => handleTileClick(3)} value={tiles[3]} id={4}/>
        <Tile onClick={() => handleTileClick(4)} value={tiles[4]} id={5}/>
        <Tile onClick={() => handleTileClick(5)} value={tiles[5]} id={6}/>
        <Tile onClick={() => handleTileClick(6)} value={tiles[6]} id={7}/>
        <Tile onClick={() => handleTileClick(7)} value={tiles[7]} id={8}/>
        <Tile onClick={() => handleTileClick(8)} value={tiles[8]} id={9}/>
      </div>
    </>
  );
};

export default Board;
