import RoomListItem from "./RoomListItem";
import { useState, useEffect } from "react";
import { WS_SERVER } from "../utils/config";
import axios from "axios";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(WS_SERVER + "/rooms")
      .then((rooms) => setRooms(rooms.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ul>
      {rooms.map(({ roomId, players }) => (
        <li key={roomId}>
          <RoomListItem roomId={roomId} numPlayers={players.length} />
        </li>
      ))}
    </ul>
  );
};

export default RoomList;
