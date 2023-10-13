const RoomModel = require("../models/Room");

const roomsController = {
  getAll: async (req, res) => {
    RoomModel.find()
      .then((rooms) => res.json(rooms))
      .catch((err) => res.json(err));
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
        res.json(room);
      }
    );
  },
  getOne: (req, res) => {
    RoomModel.findOne({ roomId: req.params.id })
      .then((room) => {
        res.json(room);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = roomsController;
