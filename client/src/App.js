import { SocketContext, socket } from "./context/socket";
import GameBoard from "./components/GameBoard";
import Room from "./components/Room";

import "./App.css";

function App() {
  const dummyRoom = 1;

  if (dummyRoom) {
    socket.emit("join", dummyRoom);
  }

  return (
    <SocketContext.Provider value={socket}>
      <div>
        <GameBoard room={dummyRoom} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
