const Table = require("../expositions/table");
const SeatingPlan = require("../expositions/seatingPlan");

module.exports = (buisness) => ({
  async create(req, res) {
    const { listeTables } = req.body;

    listeTables.map((table) => new Table(table.numTable, table.nbGuests));
    const freeze = false;

    await buisness
      .create(new SeatingPlan(listeTables, freeze))
      .then((response) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        }
        res.status(201).json({ seatingPlan: response.seating_plan });
      })
      .catch((err) => {
        res.status(500).json(err);
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
