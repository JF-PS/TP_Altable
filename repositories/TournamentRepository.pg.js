const Tournament = require("../models").Tournament;

module.exports = class TournamentsRepository {
  async getByName(name) {
    return await new Promise((resolve, reject) => {
      Tournament.findOne({
        where: { nom: name },
      })
        .then((tournament) => {
          resolve(tournament);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getById(id) {
    return await new Promise((resolve, reject) => {
      Tournament.findOne({
        where: { id },
      })
        .then((tournament) => {
          resolve(tournament);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async create(formData) {
    return await new Promise((resolve, reject) => {
      Tournament.create(formData)
        .then((tournament) => {
          resolve(tournament);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
};
