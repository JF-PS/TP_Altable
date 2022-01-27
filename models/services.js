"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.belongsTo(models.SeatingPlans, {
        foreignKey: "seatingPlanId",
        as: "seating-plan",
        allowNull: true,
      });
    }
  }
  Services.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      seatingPlanId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Services",
    }
  );
  return Services;
};
