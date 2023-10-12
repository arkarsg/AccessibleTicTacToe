const Tile = ({ value, onClick }) => {
  return (
    <div
      className="h-24 border-solid border-2 border-black text-center flex justify-center align-middle cursor-pointer"
      onClick={onClick}
    >
      <span className="font-extrabold flex items-center justify-center text-2xl">
        {value}
      </span>
    </div>
  );
};

export default Tile;
