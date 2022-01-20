const Dish = require("../models").Dishes;

module.exports = class DishesRepository {
  async create(dish) {
    return await new Promise((resolve, reject) => {
      Dish.create(dish)
        .then((newDish) => {
          resolve(newDish);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async getByName(name) {
    return await new Promise((resolve, reject) => {
      Dish.findOne({
        where: { name },
      })
        .then((dish) => {
          resolve(dish);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
