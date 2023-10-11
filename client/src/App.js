import { SocketContext, socket } from "./context/socket";
import GameBoard from "./components/GameBoard";
import { WS_SERVER } from "./utils/config";

import "./App.css";

const SERVER = WS_SERVER;

function App() {
  socket.on("connection", (data) => {
    console.log(data);
  });

  return (
    <SocketContext.Provider value={socket}>
      <div>
        <GameBoard />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
