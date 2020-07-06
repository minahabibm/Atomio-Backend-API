'use strict';

module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    revision: {
      type: DataTypes.STRING(45)
    },
    nextPortStatus: {
      type: DataTypes.STRING(45)
    },
    from: {
      type: DataTypes.STRING(45)
    },
    duration: {
      type: DataTypes.SMALLINT
    },
    type: {
      type: DataTypes.ENUM('PQ', 'SQ', 'R', 'C', 'D', 'L', 'T', 'P', 'S')
    },
    subject: {
      type: DataTypes.STRING(45)
    },
    comments: {
      type: DataTypes.STRING(45)
    },
    shipId: {
      type: DataTypes.STRING(45)
    },
    deliveryWindow: {
      type: DataTypes.STRING(45)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  });

  orders.associate = function (models) {
    orders.belongsToMany(models.contacts, {
      through: 'ordersHasAgents',
      as: 'ordersContacts',
      foreignKey: 'ordersId'
    });
    orders.belongsToMany(models.products, {
      through: 'ordersHasProducts',
      as: 'ordersproducts',
      foreignKey: 'ordersId'
    });

    orders.belongsTo(models.orders, {
      foreignKey: 'refId'
    });
    orders.belongsTo(models.users, {
      foreignKey: 'createdBy'
    });
    orders.belongsTo(models.users, {
      foreignKey: 'updatedBy'
    });
    orders.belongsTo(models.contacts, {
      foreignKey: 'inspectorId'
    });
    orders.belongsTo(models.areas, {
      foreignKey: 'locationId'
    });

    orders.hasMany(models.operationsHistory, {
      foreignKey: 'refId'
    });
    orders.hasOne(models.transfers, {
      foreignKey: 'orderId'
    });
  };

  return orders;
};
