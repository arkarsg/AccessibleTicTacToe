const RoomModel = require("./models/Player");

const playersController = {
  getAll: async (req, res) => {
    RoomModel.find({}, (err, player) => {
      if (err) {
        return res.json(err);
      }
      res.json(player);
    });
  },
  create: (req, res) => {
    RoomModel.create(req.body, (err, player) => {
      if (err) {
        return res.json(err);
      }
      res.json(player);
    });
  },
  update: (req, res) => {
    RoomModel.findOneAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, player) => {
        if (err) {
          return res.json(err);
        }
        response.json(player);
      }
    );
  },
};
