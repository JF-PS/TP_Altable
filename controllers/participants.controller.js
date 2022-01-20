module.exports = (buisness) => ({
  async create(req, res) {
    const Participant = require("../expositions/participant");

    await buisness
      .create(new Participant(req.body.name, req.body.nb_points))
      .then((participant) => {
        res.status(200).send(participant);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
});
