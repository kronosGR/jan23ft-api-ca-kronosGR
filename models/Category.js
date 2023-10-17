module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: {
          args: 'name',
          msg: 'category already exists',
        },
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  Category.associate = function (models) {
    Category.belongsTo(models.User, { foreignKey: { allowNull: false } });
  };
  return Category;
};
