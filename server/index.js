const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { setupSocketServer } = require("./socketServer");
const PlayerModel = require("./models/Player");
const RoomModel = require("./models/Room");

require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 8800;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).catch((error) => console.error(error));

async function populateData() {
  try {
    const playerCount = await PlayerModel.countDocuments();
    const roomCount = await RoomModel.countDocuments();

    if (playerCount === 0) {
      const botPlayer = new PlayerModel({
        username: "Bot Player"
      })
      const botGamer = new PlayerModel({
        username: "Bot Gamer"
      })
      await botPlayer.save();
      await botGamer.save();
    }
    if (roomCount === 0) {
      const botPlayer = await PlayerModel.findOne({username: "Bot Player"});
      const botGamer = await PlayerModel.findOne({ username: "Bot Gamer"});
      const ServerCreatedFullGame = new RoomModel({
        roomId: 1,
        players: [botPlayer, botGamer]
      });
      const ServerCreatedEmptyGame = new RoomModel({
        roomId: 2,
        players: [],
      });
      await ServerCreatedFullGame.save();
      await ServerCreatedEmptyGame.save();
    }
  } catch (error) {
    console.error("Unable to populate data");
  }
}

populateData();

app.get("/getRooms", (req, res) => {
  RoomModel.find()
    .then((rooms) => res.json(rooms))
    .catch((err) => res.json(err));
});

const server = http.createServer(app);
setupSocketServer(server);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
