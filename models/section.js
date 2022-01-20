"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    static associate(models) {
      Section.belongsTo(models.Theme, {
        foreignKey: "themeId",
        as: "theme",
      });
      Section.hasMany(models.Definition, {
        foreignKey: "sectionId",
        as: "definition",
      });
    }
  }
  Section.init(
    {
      themeId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Section",
    }
  );
  return Section;
};
