'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash1 = await bcrypt.hash('password!', 10);
    const passwordHash2 = await bcrypt.hash('password!', 10);

    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@admin.com',
        google_id: null,
        first_name: 'John',
        last_name: 'Doe',
        password: passwordHash1,
        roleId: 1,
        allowed: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user@example.com',
        google_id: null,
        first_name: 'test',
        last_name: 'user',
        password: passwordHash2,
        roleId: 2,
        allowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
