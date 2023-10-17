module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.DataTypes.STRING,
        isEmail: true,
        allowNull: false,
        unique: {
          args: 'email',
          msg: 'email already added',
        },
      },

      encryptedPassword: {
        type: Sequelize.DataTypes.BLOB,

        allowNull: false,
      },

      salt: {
        type: Sequelize.DataTypes.BLOB,

        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Todo, { foreignKey: { allowNull: false } });
  };

  return User;
};
