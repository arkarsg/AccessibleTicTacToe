const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  username: String,
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
