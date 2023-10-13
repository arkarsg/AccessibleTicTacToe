const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  sid: { type: String, unique: true },
  username: String,
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
