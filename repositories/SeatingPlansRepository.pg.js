const Services = require("../models").Services;
const Tables = require("../models").Tables;
const SeatingPlans = require("../models").SeatingPlans;
const { isEmpty } = require("lodash");
const { Op } = require("sequelize");

module.exports = class SeatingPlansRepository {
  async getNbNumTable(numTableList) {
    return await new Promise((resolve, reject) => {
      Tables.count({
        where: { numTable: numTableList },
      })
        .then((nbNumTable) => {
          resolve(nbNumTable);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async checkSchedulePlan(service) {
    const { startDate } = service;
    return await new Promise((resolve, reject) => {
      Services.findAll({
        where: {
          endDate: {
            [Op.gt]: startDate,
          },
        },
      })
        .then((servicesExists) => {
          resolve(servicesExists);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async createService(service) {
    const { startDate, endDate } = service;
    return await new Promise((resolve, reject) => {
      Services.create({ startDate, endDate })
        .then((newService) => {
          resolve(newService);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async addTableToSeatingPlan(serviceId, listTables) {
    return await new Promise((resolve, reject) => {
      listTables.map((table) => {
        SeatingPlans.create({
          numTable: table.numTable,
          nbGuests: table.nbGuests,
          serviceId,
        })
          .then((addTable) => {
            resolve(addTable);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    });
  }

  async getServiceById(id) {
    return await new Promise((resolve, reject) => {
      Services.findOne({
        attributes: ["id", "startDate", "endDate"],
        include: [
          {
            model: SeatingPlans,
            as: "services_seating_plan",
            attributes: ["serviceId", "numTable", "nbGuests"],
          },
        ],
        where: { id },
      })
        .then((seatingPlan) => {
          resolve(seatingPlan);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
};
