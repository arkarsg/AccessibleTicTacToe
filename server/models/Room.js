const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, unique: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});

RoomSchema.path("players").validate((players) => {
  return players.length <= 2;
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
