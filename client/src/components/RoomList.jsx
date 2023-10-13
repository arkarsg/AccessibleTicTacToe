import RoomListItem from "./RoomListItem";
import { useState, useEffect } from "react";
import { WS_SERVER } from "../utils/config";
import axios from "axios";

const sampleRooms = [
  {
    roomId: 1000,
    numPlayers: 2,
  },
  {
    roomId: 1010,
    numPlayers: 1,
  },
];

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(WS_SERVER + "/getRooms")
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
