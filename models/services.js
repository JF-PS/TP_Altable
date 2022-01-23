"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    static associate(models) {
      Services.hasMany(models.SeatingPlans, {
        foreignKey: "serviceId",
        as: "services_seating_plan",
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
