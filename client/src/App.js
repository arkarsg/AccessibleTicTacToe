import { SocketContext, socket } from "./context/socket";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import GameBoard from "./components/GameBoard";

function App() {
  const dummyRoom = 1;

  if (dummyRoom) {
    socket.emit("join", dummyRoom);
  }

  return (
    <div className="app">
      <NavBar />
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game" element={<GameBoard />} />
        </Routes>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
