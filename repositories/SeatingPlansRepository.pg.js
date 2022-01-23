const SeatingPlans = require("../models").SeatingPlans;
const Tables = require("../models").Tables;
const SeatingPlansTables = require("../models").SeatingPlansTables;
const { isEmpty } = require("lodash");
const { Sequelize, Op, QueryTypes } = require("sequelize");

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

  async checkSchedulePlan(seatingPlan) {
    const { dateMin, dateMax } = seatingPlan;
    return await new Promise((resolve, reject) => {
      SeatingPlans.findAll({
        // where: {
        //   [Op.or]: [
        //     {
        //       dateMin: {
        //         [Op.between]: [dateMin, dateMax],
        //       },
        //     },
        //     {
        //       dateMax: {
        //         [Op.between]: [dateMin, dateMax],
        //       },
        //     },
        //   ],
        // },
        where: {
          dateMax: {
            [Op.gt]: dateMin,
          },
        },
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

  async createSeatingPlan(seatingPlan) {
    const { dateMin, dateMax } = seatingPlan;
    return await new Promise((resolve, reject) => {
      SeatingPlans.create({ dateMin, dateMax })
        .then((newSeatingPlan) => {
          resolve(newSeatingPlan);
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
        SeatingPlansTables.create({
          numTable: table.numTable,
          nbGuests: table.nbGuests,
          seatingPlanId,
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
      console.log(id);
      SeatingPlans.findOne({
        attributes: ["id", "dateMin", "dateMax"],
        include: [
          {
            model: SeatingPlansTables,
            as: "seating_plan_tables",
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
};
