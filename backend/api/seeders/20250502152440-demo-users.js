'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@admin.com',
        google_id: null,
        first_name: 'John',
        last_name: 'Doe',
        password: 'password!',
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
        password: 'password!',
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
