"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {
      Theme.hasMany(models.Section, {
        foreignKey: "themeId",
        as: "section",
      });
      Theme.hasMany(models.Figure, {
        foreignKey: "themeId",
        as: "figure",
      });
      Theme.hasMany(models.Article, {
        foreignKey: "themeId",
        as: "article",
      });
    }
  }
  Theme.init(
    {
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Theme",
    }
  );
  return Theme;
};
