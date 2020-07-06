'use strict';

module.exports = (sequelize, DataTypes) => {
  const tanks = sequelize.define('tanks', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    maxCapacity: {
      type: DataTypes.INTEGER
    },
    heel: {
      type: DataTypes.INTEGER
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

  tanks.associate = function (models) {
    tanks.belongsToMany(models.loads, {
      through: 'ordersHasTanks',
      as: 'tanksOrdersHasTanks',
      foreignKey: 'tanksId'
    });

    tanks.belongsTo(models.users, {
      foreignKey: 'createdBy'
    });
    tanks.belongsTo(models.users, {
      foreignKey: 'updatedBy'
    });
    tanks.belongsTo(models.products, {
      foreignKey: {
        name: 'productId',
        allowNull: true
      }
    });
    tanks.belongsTo(models.tankSpecs, {
      foreignKey: 'tankSpecsId'
    });
    tanks.belongsTo(models.facilities, {
      foreignKey: 'facilityId'
    });

    tanks.hasMany(models.ordersHasTanks, {
      foreignKey: 'tanksId'
    });
    tanks.hasMany(models.operationsHistory, {
      foreignKey: 'containerId',
      constraints: false,
      scope: {
        containerType: 'T'
      }
    });
  };

  return tanks;
};
