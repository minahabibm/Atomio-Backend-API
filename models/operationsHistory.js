'use strict';

module.exports = (sequelize, DataTypes) => {
  const operationsHistory = sequelize.define('operationsHistory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    containerType: {
      type: DataTypes.ENUM('T', 'B'),
      allowNull: false
    },
    orderType: {
      type: DataTypes.ENUM('D', 'L', 'T', 'P', 'S')
    }

  });

  operationsHistory.associate = function (models) {
    operationsHistory.belongsTo(models.tankSpecs, {
      foreignKey: 'specsId'
    });
    operationsHistory.belongsTo(models.compartments, {
      constraints: false,
      foreignKey: 'containerId'
    });
    operationsHistory.belongsTo(models.tanks, {
      constraints: false,
      foreignKey: 'containerId'
    });
    operationsHistory.belongsTo(models.loads, {
      constraints: false,
      foreignKey: 'orderId'
    });
    operationsHistory.belongsTo(models.transfers, {
      constraints: false,
      foreignKey: 'orderId'
    });
    operationsHistory.belongsTo(models.deliveries, {
      constraints: false,
      foreignKey: 'orderId'
    });
  };

  return operationsHistory;
};
