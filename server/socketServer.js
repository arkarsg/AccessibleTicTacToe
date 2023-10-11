function setupSocketServer(httpServer) {
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: process.env.CLIENT,
    },
    methods: ["GET", "POST"],
  });

  const roomMembers = new Map();

  io.on("connection", (socket) => {
    console.log("client connected: ", socket.id);

    socket.on("join", (roomName) => {
      socket.join(roomName);
      if (!roomMembers.has(roomName)) {
        roomMembers.set(roomName, []);
      }
      roomMembers.get(roomName).push(socket.id);
      io.to(roomName).emit("roomMembers", roomMembers.get(roomName));
    });

    socket.on("play", ({ room, tiles, player}) => {
      socket.broadcast.to(room).emit("updateGame", { tiles, player });
    });

    socket.on("disconnet", () => {
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
