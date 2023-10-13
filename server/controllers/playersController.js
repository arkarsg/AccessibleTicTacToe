const PlayerModel = require("../models/Player");

const playersController = {
  getAll: async (req, res) => {
    PlayerModel.find()
      .then((players) => res.json(players))
      .catch((err) => res.json(err));
  },
  create: async (req, res) => {
    let newPlayer = new PlayerModel(req.body);
    newPlayer
      .save()
      .then(() => res.json(newPlayer))
      .catch((err) => res.json(err));
  },
  getOne: (req, res) => {
    console.log(req.params.id);
    PlayerModel.findOne({ sid: req.params.id })
      .then((player) => {
        res.json(player);
      })
      .catch((err) => res.json(err));
  },
  update: (req, res) => {
    PlayerModel.findOneAndUpdate(
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

module.exports = playersController;
