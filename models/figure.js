"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Figure extends Model {
    static associate(models) {
      Figure.belongsTo(models.Theme, {
        foreignKey: "themeId",
        as: "theme",
      });
    }
  }
  Figure.init(
    {
      themeId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      picture: DataTypes.TEXT,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Figure",
    }
  );
  return Figure;
};
