const gameUtils = require("./utils/GameUtils");

function setupSocketServer(httpServer) {
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: process.env.CLIENT,
    },
    methods: ["GET", "POST"],
  });

  const roomMembers = new Map();

  io.on("connection", (socket) => {
    socket.on("join", (roomName) => {
      socket.join(roomName);
      console.log(`${socket.id} connected to ${roomName}`);

      /** Create room if it does not exist */
      if (!roomMembers.has(roomName)) {
        roomMembers.set(roomName, []);
      }
      roomMembers.get(roomName).push(socket.id);
      // Emit that a player has joined the room (incl client)
      io.to(roomName).emit("joinRoom", roomMembers.get(roomName));

      /** Set the first player in the room to X */
      let playerSign = roomMembers.get(roomName).length > 1 ? "O" : "X";
      /** Assign sign to client */
      io.sockets.sockets.get(socket.id).emit("assignPlayers", playerSign);
    });

    socket.on("playTile", ({ room, tiles, player, opponent }) => {
      if (gameUtils.winCheck(tiles, player)) {
        /** player made the winning move */
        // reflexively declare self as winner
        io.sockets.sockets
          .get(socket.id)
          .emit("updateStatus", gameUtils.GAME_STATUS.WIN);
        // declare other sockets as non-winner
        socket
          .to(room)
          .emit("updateStatus", gameUtils.GAME_STATUS.LOSE);
      } else if (gameUtils.drawCheck(tiles)) {
        io.sockets.in(room).emit("updateStatus", gameUtils.GAME_STATUS.DRAW);
      }
      // still broadcast the updated tiles to other sockets
      socket.broadcast.to(room).emit("updateGame", { tiles, opponent });
    });

    socket.on("disconnect", () => {
      for (const [roomName, members] of roomMembers.entries()) {
        const index = members.indexOf(socket.id);
        if (index !== -1) {
          members.splice(index, 1);
          io.to(roomName).emit("roomMembers", members);
        }
      }
      console.log("Client disconnected: ", socket.id);
    });
  });
}

module.exports = { setupSocketServer };
