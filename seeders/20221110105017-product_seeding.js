'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./data/products.json', "utf-8", null));

    data.forEach((product) => {
      product.createdAt = product.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('Products', data, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
