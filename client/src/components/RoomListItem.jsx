import { useState } from "react";

const RoomListItem = ({ roomId, numPlayers }) => {
  return (
    <div className="flex min-w-0 gap-x-4">
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-zinc-500">
          Room {roomId}
        </p>
      </div>
      <div>
        {numPlayers} / 2
      </div>
      <button disabled={numPlayers === 2 ? true : false}>Join</button>
    </div>
  );
};

export default RoomListItem;
