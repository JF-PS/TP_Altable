module.exports = (buisness) => ({
  async create(req, res) {
    const { startDate, endDate, seatingPlanId } = req.body;
    const Service = require("../expositions/service");
    await buisness
      .create(new Service(startDate, endDate, seatingPlanId))
      .then((service) => {
        if (typeof service === "string") {
          res.status(400).send(service);
        }
        res.status(201).send(service);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  async getById(req, res) {
    await buisness
      .getById(req.params.id)
      .then((service) => {
        if (service) {
          res.status(200).json(service);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
});
