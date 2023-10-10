import Board from "./Board";

const PLAYER_X = "X";
const PLAYER_O = "O";

const GameBoard = () => {
  return (
    <div>
      <h1>Accessible Tic Tac Toe for screen readers</h1>
      <Board />
    </div>
  );
};

export default GameBoard;
