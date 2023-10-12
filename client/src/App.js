import { SocketContext, socket } from "./context/socket";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Room from "./components/Room";

function App() {
  const dummyRoom = 1;

  if (dummyRoom) {
    socket.emit("join", dummyRoom);
  }

  return (
    <div className="app">
      <BrowserRouter>
      <NavBar />
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game" element={<Room />} />
        </Routes>
      </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
