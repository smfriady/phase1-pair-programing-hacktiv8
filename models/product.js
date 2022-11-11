'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Order);
      Product.belongsTo(models.Category);
    }

    
  }
  Product.init({
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is not empty"
        },
        notNull: {
          msg: "Description is not empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Price is not empty"
        },
        notNull: {
          msg: "Price is not empty"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stock is not empty"
        },
        notNull: {
          msg: "Stock is not empty"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image is not empty"
        },
        notNull: {
          msg: "Image is not empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};