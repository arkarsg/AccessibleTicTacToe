import GameBoard from "./GameBoard";
import { socket } from "../context/socket";

const Room = () => {
  const dummyRoom = 1;

  if (dummyRoom) {
    socket.emit("join", dummyRoom);
  }
  return (
    <section>
      <div className="mt-10 text-center py-4">
        {/* Room information */}
        <h2 className="text-3xl text-zinc-900 font-semibold">
          <span className="rounded-full bg-neutral-50 px-10 py-5">
            Playing in room {dummyRoom}
          </span>
        </h2>
      </div>
      <GameBoard room={dummyRoom} />
    </section>
  );
};

export default Room;
