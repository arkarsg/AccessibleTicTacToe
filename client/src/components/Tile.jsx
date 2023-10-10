const Tile = ({ value, onClick }) => {
  return <div className="tile" onClick={onClick}>{ value }</div>;
};

export default Tile;