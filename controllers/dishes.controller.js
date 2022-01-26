module.exports = (buisness) => ({
  async create(req, res) {
    const Dish = require("../expositions/dish");
    const { name, description, type, price, quantity = 0 } = req.body;
    await buisness
      .create(new Dish(name, description, type, price, quantity))
      .then((dish) => {
        if (typeof dish === "string") {
          res.status(400).send(dish);
        }
        res.status(201).send(dish);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  async updateQuantity(req, res) {
    await buisness
      .updateQuantity(req.params.id, req.body.quantity)
      .then((dishQuantity) => {
        if (dishQuantity) {
          res.status(200).json(dishQuantity);
        } else {
          res.status(404).json({
            message: `No entry found for id(${
              (req.params.id, req.body.quantity)
            })`,
          });
        }
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
