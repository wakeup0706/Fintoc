module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    linkId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'institution_name',  // <-- This maps the model attribute to the DB column
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Bank.associate = function(models) {
    Bank.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    Bank.hasMany(models.Subscription, {
      foreignKey: 'bankId',
      as: 'subscriptions',
    });

    Bank.hasMany(models.Transaction, {
      foreignKey: 'bankId',
      as: 'transactions',
    });
  };

  return Bank;
};
