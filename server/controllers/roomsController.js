const RoomModel = require("./models/Room");

const roomsController = {
  getAll: async (req, res) => {
    RoomModel.find({}, (err, rooms) => {
      if (err) {
        return res.json(err);
      }
      res.json(rooms);
    });
  },
  create: (req, res) => {
    RoomModel.create(req.body, (err, room) => {
      if (err) {
        return res.json(err);
      }
      res.json(room);
    });
  },
  update: (req, res) => {
    RoomModel.findOneAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, room) => {
        if (err) {
          return res.json(err);
        }
        response.json(room);
      }
    );
  },
};
