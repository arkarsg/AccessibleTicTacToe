import { useState, useContext, useEffect } from "react";
import Board from "./Board";
import {
  drawCheck,
  winCheck,
  PLAYER_O,
  PLAYER_X,
  switchPlayer,
  GAME_STATUS,
} from "../utils/GameUtils";
import { SocketContext } from "../context/socket";

const GameBoard = ({ room }) => {
  const socket = useContext(SocketContext);
  /* State of the game */
  const [gameState, setGameState] = useState(Array(9).fill(""));
  /* Players in the room, the client and opponent (if any) */
  const [players, setPlayers] = useState([]);
  /** Whether it is the client's or opponent's turn to move */
  const [turn, setTurn] = useState(PLAYER_X);
  /* Sign of client's piece, initialise to "" as you can be either X or O at the start */
  const [myPlayerSign, setMyPlayerSign] = useState("");
  /* Status of the game using enums */
  const [gameStatus, setGameStatus] = useState("");
  /* Whether the game is still active -- initialise to false, assume there is only one player */
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    /**
     * Listens to another client to join the room
     */
    socket.on("joinRoom", (playersInGame) => {
      console.log(playersInGame);
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
      setTurn(gameState.player);
      // The opponent just made the move. Now, the client should be able to make a move
      setIsActive(true);
    });

    /**
     * Listens to updates in the status of the game
     */
    socket.on("updateStatus", (newGameStatus) => {
      console.log(newGameStatus);
      setGameStatus(newGameStatus);
    });

    return () => {
      socket.off("updateGame");
      socket.off("joinRoom");
      socket.off("updateStatus");
    };
  }, [socket]);

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
      // After making a move, the client should not be able to make a move again
      setIsActive(false);
    }
  };

  return (
    <div>
      <div className="container flex flex-col md:flex-row mt-20 mx-auto">
        <div className="container w-full md:w-1/4 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 justify-center mx-auto">
          <h3 className="text-xl text-zinc-700 font-semibold mb-1">Players</h3>
          <ul>
            {players.map((memberId) => (
              <li key={memberId}>{memberId}</li>
            ))}
          </ul>
        </div>
        <div className="container w-full md:w-1/2 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 items-center space-y-10 mx-auto">
          <Board tiles={gameState} handleTileClick={handleTileClick} />
        </div>
        <div className="container w-full md:w-1/4 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 mx-auto">
          <h3 className="text-xl text-zinc-700 font-semibold mb-1">
            Game History
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
