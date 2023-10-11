import { useState, useContext, useEffect, useCallback } from "react";
import Board from "./Board";
import { drawCheck, winCheck } from "../utils/GameUtils";
import { SocketContext } from "../context/socket";

const PLAYER_X = "X";
const PLAYER_O = "O";

const GameBoard = ({ room }) => {
  const socket = useContext(SocketContext);

  const [tiles, setTiles] = useState(Array(9).fill(""));
  const [canPlay, setCanPlay] = useState(true);
  const [player, setPlayer] = useState(PLAYER_X);
  const [gameStatus, setGameStatus] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("updateGame", (index) => {
      setTiles((prevTiles) => ({ ...prevTiles, [index]: "O" }));
      setCanPlay(true);
    });

    socket.on("roomMembers", (members) => {
      setPlayers(members);
    });

    return () => {
      socket.off("updateGame");
      socket.off("roomMembers");
    };
  }, []);

  function handleTileClick(i) {
    if (tiles[i] !== "") {
      return;
    }

    const nextTiles = tiles.slice();
    if (player === PLAYER_X) {
      nextTiles[i] = PLAYER_X;
    } else {
      nextTiles[i] = PLAYER_O;
    }
    setTiles(nextTiles);

    if (winCheck(nextTiles, player)) {
      const winStatus = `Winner: ${player}`;
      setGameStatus(winStatus);
      return;
    } else if (drawCheck(nextTiles)) {
      const drawStatus = "Game ended in a draw";
      setGameStatus(drawStatus);
      return;
    }

    const nextPlayer = player === PLAYER_X ? PLAYER_O : PLAYER_X;
    setPlayer(nextPlayer);
  }

  function handleReset() {
    setTiles(Array(9).fill(""));
    setPlayer(PLAYER_X);
    setGameStatus("");
  }

  return (
    <div>
      <h1>Accessible Tic Tac Toe for screen readers</h1>
      <h1>Room: {room}</h1>
      <Board tiles={tiles} handleTileClick={handleTileClick} />
      <h2>{gameStatus}</h2>
      <h2>{player}</h2>
      <ul>
        {players.map((memberId) => (
          <li key={memberId}>{memberId}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameBoard;
