import { useState, useContext, useEffect } from "react";
import Board from "./Board";
import {
  drawCheck,
  winCheck,
  PLAYER_O,
  PLAYER_X,
  switchPlayer,
} from "../utils/GameUtils";
import { SocketContext } from "../context/socket";

const GameBoard = ({ room }) => {
  const socket = useContext(SocketContext);

  const [tiles, setTiles] = useState(Array(9).fill(""));
  const [canPlay, setCanPlay] = useState(true);
  const [player, setPlayer] = useState(PLAYER_X);
  const [gameStatus, setGameStatus] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("updateGame", (gameState) => {
      setTiles(gameState.tiles);
      setPlayer(gameState.player);
      setCanPlay(true);
    });

    socket.on("roomMembers", (members) => {
      setPlayers(members);
    });

    return () => {
      socket.off("updateGame");
      socket.off("roomMembers");
    };
  }, [socket]);

  const handleTileClick = (i) => {
    if (canPlay && tiles[i] === "") {
      setCanPlay(false);
      const nextTiles = [...tiles];
      nextTiles[i] = player;
      setTiles(nextTiles);
      socket.emit("play", {
        room,
        tiles: nextTiles,
        player: switchPlayer(player),
      });

    }
  };

  useEffect(() => {
    if (winCheck(tiles, player)) {
      setGameStatus(`Winner: ${player}`);
    } else if (drawCheck(tiles)) {
      setGameStatus("Game ended in a draw")
    }
  }, [tiles, player])

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
