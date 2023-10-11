function setupSocketServer(httpServer) {
  const io = require("socket.io")(httpServer, {
    cors: {
      origin: process.env.CLIENT,
    },
    methods: ["GET", "POST"],
  });

  io.on("connection", (data) => {
    console.log("client connected: ", data.id);
  });
}

module.exports = { setupSocketServer };
