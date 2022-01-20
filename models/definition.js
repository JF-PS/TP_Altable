"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Definition extends Model {
    static associate(models) {
      Definition.belongsTo(models.Section, {
        foreignKey: "sectionId",
        as: "section",
      });
    }
  }
  Definition.init(
    {
      sectionId: DataTypes.INTEGER,
      field: DataTypes.TEXT,
      value: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Definition",
    }
  );
  return Definition;
};
