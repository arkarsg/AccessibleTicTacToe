import { useContext, useState, useEffect, useCallback } from "react";
import { SocketContext } from "../context/socket";

const Room = ({ room }) => {
  const socket = useContext(SocketContext);
  const [roomMembers, setRoomMembers] = useState([]);

  const handleRoomMember = useCallback((members) => {
    console.log(members);
  }, []);

  useEffect(() => {
    if (room) {
      socket.emit("join", room);
    }
    socket.on("roomMembers", (members) => {
      handleRoomMember(members);
    });

    return () => {
      socket.off("roomMembers");

    };
  }, []);
  return (
    <div>
      <h1>Room: {room}</h1>
      <h2>Room Members:</h2>
      <ul>
        {roomMembers.map((memberId) => (
          <li key={memberId}>{memberId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
