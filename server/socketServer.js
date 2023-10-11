function setupSocketServer(httpServer) {
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: process.env.CLIENT,
    },
    methods: ["GET", "POST"],
  });

  io.on("connection", (socket) => {
    console.log("client connected: ", socket.id);
  });
}

module.exports = { setupSocketServer };
