const playersController = require("./controllers/playersController");
const roomsController = require("./controllers/roomsController");

const routes = (route) => {
  route.get("/", (req, res) => {
    res.send("Hello from server!");
  });

  route
    .route("/players")
    .get(playersController.getAll)
    .post(playersController.create)
    .put(playersController.update);

  route
    .route("/rooms")
    .get(roomsController.getAll)
    .post(roomsController.create);

  route
    .route("/rooms/:id")
    .get(roomsController.getOne)
    .put(roomsController.update);
};

module.exports = routes;
