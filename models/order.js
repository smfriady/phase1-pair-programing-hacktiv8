'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Product);
    }
  }
  Order.init({
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN,
    isDelivered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};