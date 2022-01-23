"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tables extends Model {
    static associate(models) {
      // Tables.belongsTo(models.SeatingPlansTables, {
      //   foreignKey: "numTable",
      //   as: "table",
      // });
    }
  }
  Tables.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      numTable: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tables",
    }
  );
  return Tables;
};
