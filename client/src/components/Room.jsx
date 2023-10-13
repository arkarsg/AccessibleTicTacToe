import GameBoard from "./GameBoard";
import { socket } from "../context/socket";
import { useParams } from "react-router-dom";

const Room = () => {
  let room = useParams()

  if (room) {
    socket.emit("join", room.id);
  }
  return (
    <section>
      {/* Room information */}
      <h2 className="text-center text-3xl text-zinc-900 font-semibold">
        <span className="rounded-full bg-neutral-50 px-10 py-5">
          Playing in room {room.id}
        </span>
      </h2>
      <GameBoard room={room.id} />
    </section>
  );
};

export default Room;
