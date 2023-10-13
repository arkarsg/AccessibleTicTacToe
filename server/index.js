const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { setupSocketServer } = require("./socketServer");

require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 8800;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).catch(error => console.error(error));

const server = http.createServer(app);
setupSocketServer(server);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
