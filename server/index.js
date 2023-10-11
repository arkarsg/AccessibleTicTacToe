const express = require("express");
const cors = require("cors");
const http = require("http");
const { setupSocketServer } = require("./socketServer");

require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 8800;
const app = express();
app.use(cors());

const server = http.createServer(app);
setupSocketServer(server);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
// socket server

