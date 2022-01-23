"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeatingPlansTables extends Model {
    static associate(models) {
      SeatingPlansTables.belongsTo(models.Tables, {
        foreignKey: "numTable",
        as: "table",
        allowNull: true,
      });

      SeatingPlansTables.belongsTo(models.SeatingPlans, {
        foreignKey: "seatingPlanId",
        as: "seating-plan",
        allowNull: true,
      });
    }
  }
  SeatingPlansTables.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      seatingPlanId: DataTypes.INTEGER,
      numTable: DataTypes.INTEGER,
      nbGuests: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SeatingPlansTables",
    }
  );
  return SeatingPlansTables;
};
