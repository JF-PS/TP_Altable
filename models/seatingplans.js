"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeatingPlans extends Model {
    static associate(models) {
      SeatingPlans.belongsTo(models.Tables, {
        foreignKey: "numTable",
        as: "table",
        allowNull: true,
      });

      SeatingPlans.belongsTo(models.Services, {
        foreignKey: "serviceId",
        as: "services",
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
      serviceId: DataTypes.INTEGER,
      numTable: DataTypes.INTEGER,
      nbGuests: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SeatingPlans",
    }
  );
  return SeatingPlans;
};
