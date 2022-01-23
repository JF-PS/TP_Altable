module.exports = (buisness) => ({
  async create(req, res) {
    const { listeTables, startDate, endDate } = req.body;
    const Table = require("../expositions/table");
    const SeatingPlan = require("../expositions/seatingPlan");

    listeTables.map((table) => new Table(table.numTable, table.nbGuests));

    await buisness
      .create(new SeatingPlan(listeTables, startDate, endDate))
      .then((seatingPlan) => {
        if (typeof seatingPlan === "string") {
          res.status(400).send(seatingPlan);
        }
        res.status(201).send(seatingPlan);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  async getById(req, res) {
    await buisness
      .getById(req.params.id)
      .then((seatingPlan) => {
        if (seatingPlan) {
          res.status(200).json(seatingPlan);
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
