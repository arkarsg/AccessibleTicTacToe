const Welcome = () => {
  return (
    <div className="container flex flex-col items-center px-6 py-20 sm:py-10 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
      <div className="flex flex-col space-y-5 md:w-1/2">
        <div>
          <h1 className="max-w text-3xl text-zinc-900 font-bold text-left sm:text-3xl">
            Play tic tac toe with another player
          </h1>
          <p className="mt-3 py-0 text-zinc-500 text-left text-base font-semibold">
            To play a game, create a room or join a game
          </p>
        </div>
        <div>
          <h2 className="max-w text-2xl text-zinc-800 font-bold text-left sm:text-xl">
            How to play?
          </h2>
          <p className="mt-3 py-0 text-zinc-500 text-left text-base font-semibold">
            Use the arrow keys on your keyboard and press "Enter" to place your
            piece
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
