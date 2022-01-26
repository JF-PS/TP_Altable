const Dish = require("../expositions/dish");

module.exports = (buisness) => ({
  async create(req, res) {
    const { name, description, type, price, quantity = 0 } = req.body;
    await buisness
      .create(new Dish(name, description, type, price, quantity))
      .then((response) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        }
        res.status(201).json({ dish: response.createDish });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  async updateQuantity(req, res) {
    await buisness
      .updateQuantity(req.params.id, req.body.quantity)
      .then((response) => {
        if (response.errorMessage != null) {
          res.status(412).json({ message: response.errorMessage });
        }

        res.status(201).json({ updateQuantity: response.updateQuantity });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  async getAll(req, res) {
    await buisness
      .getAll(req.params.id)
      .then((dishes) => {
        if (dishes) {
          res.status(200).json(dishes);
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

  async getAllPositiveQuantity(req, res) {
    await buisness
      .getAllPositiveQuantity(req.params.id)
      .then((dishes) => {
        if (dishes) {
          res.status(200).json(dishes);
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
