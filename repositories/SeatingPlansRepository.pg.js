const Tables = require("../models").Tables;
const SeatingPlans = require("../models").SeatingPlans;
const PlanManagements = require("../models").PlanManagements;
const { isEmpty } = require("lodash");
const { Op } = require("sequelize");

module.exports = class SeatingPlansRepository {
  async getNbNumTable(numTableList) {
    return await new Promise((resolve, reject) => {
      Tables.count({
        where: { id: numTableList },
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

  async createSeatingPlan() {
    return await new Promise((resolve, reject) => {
      SeatingPlans.create()
        .then((seatingPlan) => {
          resolve(seatingPlan);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async addTableToSeatingPlan(seatingPlanId, listTables) {
    return await new Promise((resolve, reject) => {
      listTables.map((table) => {
        PlanManagements.create({
          seatingPlanId,
          numTable: table.numTable,
          nbGuests: table.nbGuests,
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

  async getSeatingPlanById(id) {
    return await new Promise((resolve, reject) => {
      SeatingPlans.findOne({
        attributes: ["id", "freeze"],
        include: [
          {
            model: PlanManagements,
            as: "tables",
            attributes: ["seatingPlanId", "numTable", "nbGuests"],
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

  async updateSeatingPlanFreeze(id, freeze) {
    return await new Promise((resolve, reject) => {
      SeatingPlans.findOne({ where: { id } })
        .then((updateSeatingPlan) => {
          resolve(updateSeatingPlan.update({ freeze }));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
};
