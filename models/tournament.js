'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tournament.init({
    nom: DataTypes.TEXT,
    nb_participants: DataTypes.INTEGER,
    nb_max_participants: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};