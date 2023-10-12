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
      setGameStatus("Game ended in a draw");
    }
  }, [tiles, player]);

  return (
    <div>
      <div className="container flex flex-col md:flex-row mt-20 mx-auto">
        <div className="container w-full md:w-1/4 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 justify-center mx-auto">
          <h3 className="text-xl text-zinc-800 font-semibold mb-1">Players</h3>
          <ul>
            {players.map((memberId) => (
              <li key={memberId}>{memberId}</li>
            ))}
          </ul>
        </div>
        <div className="container w-full md:w-1/2 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 items-center space-y-10 mx-auto">
          <Board tiles={tiles} handleTileClick={handleTileClick} />
        </div>
        <div className="container w-full md:w-1/4 p-4 border-b-2 md:border-r-2 md:border-b-0 border-zinc-200 mx-auto">
          <h3 className="text-xl text-zinc-800 font-semibold mb-1">
            Game History
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
