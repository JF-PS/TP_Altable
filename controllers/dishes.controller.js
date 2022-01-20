module.exports = (buisness) => ({
  async create(req, res) {
    const Dish = require("../expositions/dish");
    const { name, description, type, price, quantity = 0 } = req.body;
    await buisness
      .create(new Dish(name, description, type, price, quantity))
      .then((dish) => {
        res.status(dish.status).send(dish.response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
});
