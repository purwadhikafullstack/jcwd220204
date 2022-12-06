'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Property.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    distance: DataTypes.STRING,
    photos: DataTypes.STRING,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    rating: DataTypes.NUMBER,
    rooms: DataTypes.STRING,
    cheapestPrice: DataTypes.NUMBER,
    featured: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};