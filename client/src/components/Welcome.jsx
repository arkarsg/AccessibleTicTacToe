import { Link } from "react-router-dom";
import RoomList from "./RoomList";

const Welcome = () => {
  return (
    <div className="w-fit relative container flex flex-col items-center px-6 py-20 sm:py-10 mx-auto mt-10 md:space-y-0 md:flex-row">
      <div className="flex flex-col px-5 space-y-5 md:w-1/2">
        <div>
          <h1 className="max-w text-3xl text-zinc-900 font-bold text-left sm:text-3xl">
            Play tic tac toe with another player
          </h1>
          <p className="mt-3 py-0 text-zinc-700 text-left text-base font-semibold">
            To play a game, create a room or join a game
          </p>
        </div>
        <div>
          <h2 className="max-w text-2xl text-zinc-800 font-bold text-left sm:text-xl">
            How to play?
          </h2>
          <p className="mt-3 py-0 text-zinc-700 text-left text-base font-semibold">
            Use the arrow keys on your keyboard and press "Enter" to place your
            piece
          </p>
        </div>
      </div>
      <div className="absolute relative px-10 md:w-1/2 space-y-5 flex flex-col">
        <RoomList />
        <Link to="/game">
          <button className="inset-x-0 bottom-0 flex w-full justify-center rounded-md px-3 py-1.5 bg-gradient-to-r from-fuchsia-700 to-purple-600 text-white text-m font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create Room
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
