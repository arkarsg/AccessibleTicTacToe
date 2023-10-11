import GameBoard from "./components/GameBoard";
import { io } from "socket.io-client";
import { WS_SERVER } from "./utils/config";
import { useEffect, useState } from "react";

import "./App.css";

const SERVER = WS_SERVER;

function App() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io(SERVER);
    setSocket(socket);
    socket.on("connection", (data) => {
      console.log(data);
    });
    return () => socket.disconnect();
  }, [setSocket]);
  return (
    <div>
      <GameBoard />
    </div>
  );
}

export default App;
