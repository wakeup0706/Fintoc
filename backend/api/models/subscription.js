module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    subscription_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_amount_spent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    last_payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    average_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    median_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_spent_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    days_since_last_payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_balance_current: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Banks',
        key: 'id',
      },
    },
  });

  // Associations
  Subscription.associate = (models) => {
    Subscription.belongsTo(models.Bank, {
      foreignKey: 'bankId',
      as: 'bank',
    });
  };

  return Subscription;
};
