import { SocketContext, socket } from "./context/socket";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import Room from "./components/Room";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar />
        <SocketContext.Provider value={socket}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/rooms/:id" element={<Room />} />
          </Routes>
        </SocketContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
