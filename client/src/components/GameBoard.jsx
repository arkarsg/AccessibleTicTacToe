import { useState, useContext, useEffect } from "react";
import Board from "./Board";
import { socket } from "../context/socket";
import generateRandomAnimal from "random-animal-name";

const GameBoard = ({ room, myPlayer }) => {
  /* State of the game */
  const [gameState, setGameState] = useState(Array(9).fill(""));
  /* Players in the room, the client and opponent (if any) */
  const [players, setPlayers] = useState([]);
  /** Whether it is the client's or opponent's turn to move */
  const [turn, setTurn] = useState("X");
  /* Sign of client's piece, initialise to "" as you can be either X or O at the start */
  const [myPlayerSign, setMyPlayerSign] = useState("");
  /* Status of the game using enums */
  const [gameStatus, setGameStatus] = useState("");
  /* Whether the game is still active */
  const [isActive, setIsActive] = useState(false);
  /* Turn message */
  const [turnMessage, setTurnMessage] = useState(
    "Waiting for game to start..."
  );

  useEffect(() => {
    /**
     * Listens to another client to join the room
     */
    socket.on("joinRoom", (playersInGame) => {
      setPlayers(playersInGame);
    });

    /**
     * Listens to server's assignment of player signs
     */
    socket.on("assignPlayers", (playerSign) => {
      console.log(`${socket.id} assigned as ${playerSign}`);
      setMyPlayerSign(playerSign);
    });

    /**
     * Listens to updates in the state of the game
     */
    socket.on("updateGame", (gameState) => {
      setGameState(gameState.tiles);
      setTurn(gameState.opponent);
      setTurnMessage(`${gameState.opponent}'s turn`);
      // The opponent just made the move. Now, the client should be able to make a move
      setIsActive(true);
      if (gameStatus !== "") {
        setIsActive(false);
      }
    });

    /**
     * Listens to updates in the status of the game
     */
    socket.on("updateStatus", (newGameStatus) => {
      setGameStatus((prevState) => (prevState = newGameStatus));
      setIsActive(false);
    });

    return () => {
      socket.off("updateGame");
      socket.off("joinRoom");
      socket.off("updateStatus");
    };
  }, [socket, gameStatus]);

  const handleTileClick = (i) => {
    if (isActive && gameState[i] === "") {
      /* if the game is ongoing and the tile is empty */
      const nextTiles = [...gameState];
      nextTiles[i] = myPlayerSign; // set client's piece
      setGameState(nextTiles); // optimistically update the gameState
      const opponentSign = switchPlayer(myPlayerSign);

      /** Emit the tile played */
      socket.emit("playTile", {
        room,
        tiles: nextTiles,
        player: myPlayerSign,
        opponent: opponentSign,
      });
      // pass the turn to opponent
      setTurn(opponentSign);
      setTurnMessage(`${opponentSign}'s turn`);
      // After making a move, the client should not be able to make a move again
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (players.length === 2) {
      setIsActive(true);
      setTurnMessage("Game started!");
    }
  }, [players]);

  return (
    <div>
      <div
        role="main"
        className="container flex flex-col md:flex-row mt-20 mx-auto"
      >
        <div
          role="region"
          aria-label="Players in game"
          className="container w-full md:w-1/4 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 justify-center mx-auto"
        >
          <h3 className="text-xl text-zinc-700 font-semibold mb-1">Players</h3>
          <ul>
            {players.map((socketId) => (
              <li key={socketId}>
                {socketId === socket.id
                  ? myPlayerSign + " " + generateRandomAnimal() + " (You)"
                  : switchPlayer(myPlayerSign) + " " + 
                    generateRandomAnimal() +
                    " (Opponent)"}
              </li>
            ))}
          </ul>
        </div>
        <div
          role="region"
          aria-label="Tic Tac Toe board"
          className="container w-full md:w-1/2 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 items-center space-y-10 mx-auto"
        >
          <h3
            aria-live="polite"
            className="text-center text-xl text-zinc-700 font-semibold mb-1"
          >
            {gameStatus === "" ? turnMessage : gameStatus}
          </h3>
          <Board tiles={gameState} handleTileClick={handleTileClick} />
        </div>
        <div
          role="complementary"
          aria-label="Game History"
          className="container w-full md:w-1/4 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 mx-auto"
        >
          <h3 className="text-xl text-zinc-700 font-semibold mb-1">
            Game History
          </h3>
        </div>
      </div>
    </div>
  );
};

const switchPlayer = (player) => {
  const nextPlayer = player === "O" ? "X" : "O";
  return nextPlayer;
};

export default GameBoard;
