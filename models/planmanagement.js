"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlanManagements extends Model {
    static associate(models) {
      PlanManagements.belongsTo(models.Tables, {
        foreignKey: "numTable",
        as: "table",
        allowNull: true,
      });

      PlanManagements.belongsTo(models.SeatingPlans, {
        foreignKey: "seatingPlanId",
        as: "services",
        allowNull: true,
      });
    }
  }
  PlanManagements.init(
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
      modelName: "PlanManagements",
    }
  );
  return PlanManagements;
};
