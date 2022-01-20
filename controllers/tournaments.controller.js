module.exports = (buisness) => ({
  async create(req, res) {
    const Tournament = require("../expositions/tournament");
    await buisness
      .create(new Tournament(req.body.nom))
      .then((tournament) => {
        res.status(200).send(tournament);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  async getById(req, res) {
    await buisness
      .getById(req.params.id)
      .then((tournament) => {
        if (tournament) {
          res.status(200).json(tournament);
        } else {
          res
            .status(404)
            .json({ message: `No entry found for id(${req.params.id})` });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
});
