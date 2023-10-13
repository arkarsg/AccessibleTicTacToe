const PlayerModel = require("../models/Player");

const playersController = {
  getAll: async (req, res) => {
    PlayerModel.find()
      .then((players) => res.json(players))
      .catch((err) => res.json(err));
  },
  create: async (req, res) => {
    let newPlayer = new PlayerModel(req.body);
    newPlayer.save((err, player) => {
        if (err) {
            res.send(err);
        }
        res.json(player);
    })
    
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
