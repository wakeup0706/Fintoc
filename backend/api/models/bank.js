module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    linkId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Associations
  Bank.associate = (models) => {
    Bank.hasMany(models.Subscription, {
      foreignKey: 'bankId',
      as: 'subscriptions',
    });
  };

  return Bank;
};
