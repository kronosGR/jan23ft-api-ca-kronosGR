module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define(
    'Status',
    {
      status: {
        type: Sequelize.DataTypes.STRING,
        unique: {
          args: 'Status',
          msg: 'Status already added',
        },
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Status;
};
