const Dish = require("../models").Dishes;
const { Op } = require("sequelize");

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

  async updateQuantity(id, quantity) {
    return await new Promise((resolve, reject) => {
      Dish.findOne({
        where: { id },
      })
        .then((dish) => {
          resolve(dish.update({ quantity }));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async getAll() {
    return await new Promise((resolve, reject) => {
      Dish.findAll()
        .then((dishes) => {
          resolve(dishes);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getAllPositiveQuantity() {
    return await new Promise((resolve, reject) => {
      Dish.findAll({
        where: {
          quantity: {
            [Op.gte]: 1,
          },
        },
      })
        .then((dishes) => {
          resolve(dishes);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
