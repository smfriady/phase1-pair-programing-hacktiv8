'use strict';
const bcrypt = require('bcryptjs');
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./data/users.json', "utf-8", null));

    data.forEach((user) => {
      if (user.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
      user.createdAt = user.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('Users', data, {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
