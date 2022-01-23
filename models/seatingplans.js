"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeatingPlans extends Model {
    static associate(models) {
      SeatingPlans.hasMany(models.SeatingPlansTables, {
        foreignKey: "seatingPlanId",
        as: "seating_plan_tables",
        allowNull: true,
      });
    }
  }
  SeatingPlans.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dateMin: DataTypes.DATE,
      dateMax: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "SeatingPlans",
    }
  );
  return SeatingPlans;
};
