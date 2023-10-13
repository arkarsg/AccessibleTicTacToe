import { useNavigate } from "react-router-dom";

const RoomListItem = ({ roomId, numPlayers }) => {
  const navigate = useNavigate();

  const handleRoomJoin = () => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="flex items-center min-w-0 gap-x-4">
      <div className="min-w-0 flex-auto justify">
        <p className="font-semibold leading-6 text-zinc-700">
          Room {roomId}
        </p>
      </div>
      {/** Slightly improve how it is read by making it more verbose for screen readers */}
      <div className="flex items-center justify-center" aria-hidden="true">
        {numPlayers} / 2
      </div>
      <span className="sr-only">{numPlayers} out of 2 players</span>
      <button
        type="button"
        className="whitespace-nowrap py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-4 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
        onClick={handleRoomJoin}
        disabled={numPlayers === 2 ? true : false}
      >
        Join Game
      </button>
    </div>
  );
};

export default RoomListItem;
