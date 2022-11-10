'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    role: {
      type: DataTypes.ENUM,
      values: ['Admin', 'Customer'],
      allowNull: false,
      defaultValue: 'Customer',
      validate: {
        roleValidator(value) {
          if (value !== "Admin" || value !== "Customer") {
            throw new Error("No role choose");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};