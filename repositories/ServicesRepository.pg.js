const Services = require("../models").Services;
const SeatingPlans = require("../models").SeatingPlans;
const PlanManagements = require("../models").PlanManagements;
const { Op } = require("sequelize");

module.exports = class SeatingPlansRepository {
  async checkSchedulePlan(service) {
    const { startDate } = service;
    console.log(startDate);
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
    const { startDate, endDate, seatingPlanId } = service;
    return await new Promise((resolve, reject) => {
      Services.create({ startDate, endDate, seatingPlanId })
        .then((newService) => {
          resolve(newService);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async getServiceById(id) {
    return await new Promise((resolve, reject) => {
      Services.findOne({
        attributes: ["id", "seatingPlanId", "startDate", "endDate"],
        include: [
          {
            model: SeatingPlans,
            as: "seating-plan",
            attributes: ["id", "freeze"],
            include: [
              {
                model: PlanManagements,
                as: "tables",
                attributes: ["seatingPlanId", "numTable", "nbGuests"],
              },
            ],
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
