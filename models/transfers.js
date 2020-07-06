'use strict';

module.exports = (sequelize, DataTypes) => {
  const transfers = sequelize.define('transfers', {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }

  });

  transfers.associate = function (models) {
    transfers.belongsTo(models.orders, {
      foreignKey: 'orderId'
    });

    transfers.hasMany(models.operationsHistory, {
      foreignKey: 'orderId',
      constraints: false,
      scope: {
        table: 'transfers'
      }
    });
    transfers.hasMany(models.ordersHasTanks, {
      foreignKey: 'orderId'
    });
  };

  return transfers;
};
