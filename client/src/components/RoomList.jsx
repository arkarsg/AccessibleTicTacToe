import RoomListItem from "./RoomListItem";

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
  return (
    <ul>
      {sampleRooms.map(({ roomId, numPlayers }) => (
        <li key={roomId}>
          <RoomListItem roomId={roomId} numPlayers={numPlayers} />
        </li>
      ))}
    </ul>
  );
};

export default RoomList;
