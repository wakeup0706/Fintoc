module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscriptions', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      subscription_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_amount_spent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      last_payment_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      frequency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      average_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      median_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      total_spent_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      days_since_last_payment: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account_balance_current: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bankId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Banks', // Assuming you have a 'Banks' table
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscriptions');
  }
};
