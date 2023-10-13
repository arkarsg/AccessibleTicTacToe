const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: String,
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
