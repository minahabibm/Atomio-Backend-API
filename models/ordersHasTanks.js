'use strict';

module.exports = (sequelize, DataTypes) => {
  const ordersHasTanks = sequelize.define('ordersHasTanks', {
    orderType: {
      type: DataTypes.ENUM('PQ', 'SQ', 'R', 'C', 'D', 'L', 'T', 'P', 'S')
    },
    volume: {
      type: DataTypes.INTEGER
    }
  });

  ordersHasTanks.associate = function (models) {
    ordersHasTanks.belongsTo(models.tanks, {
      foreignKey: 'tanksId'
    });

    ordersHasTanks.belongsTo(models.transfers, {
      foreignKey: 'orderId'
    });
  };

  return ordersHasTanks;
};
