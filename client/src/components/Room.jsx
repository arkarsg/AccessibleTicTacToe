import GameBoard from "./GameBoard";

const Room = () => {
  const dummyRoom = 1;
  return (
    <section>
      <div className="mt-10 text-center py-4">
        {/* Room information */}
        <h2 className="text-3xl text-zinc-800 font-semibold">
          <span className="rounded-full bg-neutral-50 px-10 py-5">
            Playing in room {dummyRoom}
          </span>
        </h2>
      </div>
      <GameBoard />
    </section>
  );
};

export default Room;
