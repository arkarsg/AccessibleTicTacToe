import { SocketContext, socket } from "./context/socket";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";

function App() {
  const dummyRoom = 1;

  if (dummyRoom) {
    socket.emit("join", dummyRoom);
  }

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <NavBar />
        <Welcome />
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
