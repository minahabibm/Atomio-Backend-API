'use strict';

module.exports = (sequelize) => {
  const deliveries = sequelize.define('deliveries', {

  });

  deliveries.associate = function (models) {
    deliveries.belongsTo(models.orders, {
      foreignKey: 'id'
    });
    deliveries.belongsTo(models.compartments, {
      foreignKey: 'compartmentNumber'
    });
    deliveries.belongsTo(models.compartments, {
      targetKey: 'bargeId',
      foreignKey: 'bargeId'
    });

    deliveries.hasMany(models.operationsHistory, {
      foreignKey: 'orderId',
      constraints: false,
      scope: {
        table: 'deliveries'
      }
    });
  };

  return deliveries;
};
