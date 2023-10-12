import { SocketContext, socket } from "./context/socket";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  const dummyRoom = 1;

  if (dummyRoom) {
    socket.emit("join", dummyRoom);
  }

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <NavBar />
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
