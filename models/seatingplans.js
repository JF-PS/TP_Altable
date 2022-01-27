"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeatingPlans extends Model {
    static associate(models) {
      SeatingPlans.hasMany(models.PlanManagements, {
        foreignKey: "seatingPlanId",
        as: "tables",
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
      freeze: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "SeatingPlans",
    }
  );
  return SeatingPlans;
};
