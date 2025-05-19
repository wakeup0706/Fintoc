module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    bankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Bank, {
      foreignKey: 'bankId',
      as: 'bank',
    });
  };

  return Transaction;
};
