'use strict';

module.exports = (sequelize) => {
  const loads = sequelize.define('loads', {

  });

  loads.associate = function (models) {
    loads.belongsToMany(models.tanks, {
      through: 'ordersHasTanks',
      as: 'loadsOrdersHasTanks',
      foreignKey: 'orderId'
    });

    loads.belongsTo(models.orders, {
      foreignKey: 'id'
    });
    loads.belongsTo(models.compartments, {
      foreignKey: 'compartmentNumber'
    });
    loads.belongsTo(models.compartments, {
      targetKey: 'bargeId',
      foreignKey: 'bargeId'
    });

    loads.hasMany(models.operationsHistory, {
      foreignKey: 'orderId',
      constraints: false,
      scope: {
        table: 'loads'
      }
    });
  };


  return loads;
};
