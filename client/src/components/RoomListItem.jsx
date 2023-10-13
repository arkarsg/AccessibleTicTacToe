import { useState } from "react";

const RoomListItem = ({ roomId, numPlayers }) => {
  return (
    <div className="flex min-w-0 gap-x-4">
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-zinc-600">
          Room {roomId}
        </p>
      </div>
      {/** Slightly improve how it is read by making it more verbose for screen readers */}
      <div aria-hidden="true">{numPlayers} / 2</div>
      <span className="sr-only">{numPlayers} out of 2 players</span>
      <button disabled={numPlayers === 2 ? true : false}>Join Game</button>
    </div>
  );
};

export default RoomListItem;
