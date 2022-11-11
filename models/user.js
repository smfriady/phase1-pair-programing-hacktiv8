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
      User.hasMany(models.Order);

    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is not empty"
        },
        notNull: {
          msg: "Name is not empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is not empty"
        },
        notNull: {
          msg: "Email is not empty"
        }
      }
    },
    password: DataTypes.TEXT,
    role: {
      type: DataTypes.ENUM,
      values: ['Admin', 'Customer'],
      allowNull: false,
      defaultValue: 'Customer',
      validate: {
        roleValidator(value) {
          console.log(value);
          if (value !== "Admin") {
            if (value !== "Customer") {
              throw new Error("No role choose");
            }
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