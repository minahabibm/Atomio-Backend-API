'use strict';

module.exports = (sequelize, DataTypes) => {
  const compartments = sequelize.define('compartments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER
    },
    maxCapacity: {
      type: DataTypes.INTEGER
    },
    minCapacity: {
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

  compartments.associate = function (models) {
    compartments.hasMany(models.operationsHistory, {
      foreignKey: 'containerId',
      constraints: false,
      scope: {
        containerType: 'B'
      }
    });
    compartments.belongsTo(models.productCategories, {
      foreignKey: 'categoryId'
    });
    compartments.belongsTo(models.users, {
      foreignKey: 'createdBy'
    });
    compartments.belongsTo(models.users, {
      foreignKey: 'updatedBy'
    });
    compartments.belongsTo(models.barges, {
      foreignKey: {
        name: 'bargeId',
        unique: true
      }

    });
  };

  return compartments;
};
