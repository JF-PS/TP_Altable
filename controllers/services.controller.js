module.exports = (buisness) => ({
  async create(req, res) {
    const { startDate, endDate, seatingPlanId } = req.body;
    const Service = require("../expositions/service");
    await buisness
      .create(new Service(startDate, endDate, seatingPlanId))
      .then((response) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        }
        res.status(201).json({ service: response.theService });
      })
      .catch((err) => {
        res.status(500).json(err);
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
