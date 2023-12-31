import { useNavigate } from "react-router-dom";
import { WS_SERVER } from "../utils/config";
import RoomList from "./RoomList";
import axios from "axios";

const Welcome = () => {
  const navigate = useNavigate();

  const handleRoomCreationAndJoin = async () => {
    const newRoom = { roomId: Math.floor(Math.random() * 1000), players: [] };
    // update the db for rooms
    await axios
      .post(WS_SERVER + "/rooms", newRoom)
      .then((res) => navigate(`/rooms/${res.data.roomId}`));
  };

  return (
    /**
     * Welcome page has 2 region: 1 for gameplay tutorial and 1 for rooms and create room option
     */
    <div
      role="main"
      aria-label="welcome"
      className="w-fit relative container flex flex-col items-center px-6 space-x-5  py-20 sm:py-10 mx-auto mt-10 sm:space-y-10 md:space-y-5 md:flex-row"
    >
      <div
        role="region"
        aria-label="gameplay-tutorial"
        className="flex flex-col px-5 space-y-5 md:w-1/2"
      >
        <h1 className="max-w text-3xl text-zinc-900 font-bold text-left sm:text-3xl">
          Play tic tac toe with another player
        </h1>
        <p className="mt-3 py-0 text-zinc-700 text-left text-base font-semibold">
          To play a game, create a room or join a game
        </p>
        <h2 className="max-w text-2xl text-zinc-900 font-bold text-left sm:text-xl">
          How to play?
        </h2>
        <p className="mt-3 py-0 text-zinc-700 text-left text-base font-semibold">
          Use the screen reader keys on your keyboard and press "Enter" to place your
          piece
        </p>
      </div>
      <div
        role="region"
        aria-label="join-or-create-games"
        className="px-6 md:w-1/2 space-y-5 flex flex-col mt-10"
      >
        <RoomList />
        <button
          onClick={handleRoomCreationAndJoin}
          className="inset-x-0 bottom-0 flex w-full justify-center rounded-md px-3 py-1.5 bg-gradient-to-r from-fuchsia-700 to-purple-600 text-white text-m font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default Welcome;
