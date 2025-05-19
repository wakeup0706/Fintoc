module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    subscription_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'subscription_name'
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'amount'
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'frequency'
    },
    days_since_last_transaction: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'days_since_last_transaction'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'category'
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'payment_type'
    },
    balance_available: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'balance_available'
    },
    bankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'bankId'
    },
  });

  Subscription.associate = function (models) {
    Subscription.belongsTo(models.Bank, {
      foreignKey: 'bankId',
      as: 'bank',
    });
  };

  return Subscription;
};
