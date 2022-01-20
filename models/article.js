"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.Theme, {
        foreignKey: "themeId",
        as: "theme",
      });
    }
  }
  Article.init(
    {
      themeId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
