import { TILE_POSITIONS } from "../utils/GameUtils";

const Tile = ({ value, onClick, id }) => {
  return (
    <button onClick={onClick} aria-label={TILE_POSITIONS[id]}>
      <div className="h-24 border-solid border-2 border-black text-center flex justify-center align-middle cursor-pointer">
        <span className="font-extrabold flex items-center justify-center text-2xl">
          {value}
        </span>
      </div>
    </button>
  );
};

export default Tile;
