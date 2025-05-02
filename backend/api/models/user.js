module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    google_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles', // This is the table we're referencing
        key: 'id',
      },
      allowNull: false,
    },
    allowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  });

  User.associate = function(models) {
    // Make sure 'Role' is loaded before this
    User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
  };

  return User;
};
