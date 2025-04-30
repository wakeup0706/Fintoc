module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });

    Role.associate = function(models) {
      // A Role can have many Users
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users',
      });
    };

    return Role;
  };
