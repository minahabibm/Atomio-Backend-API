'use strict';

module.exports = (sequelize, DataTypes) => {
  const tankSpecs = sequelize.define('tankSpecs', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    api: {
      type: DataTypes.DECIMAL(18, 2)
    },
    sg: {
      type: DataTypes.DECIMAL(18, 2)
    },
    density: {
      type: DataTypes.INTEGER
    },
    viscosity: {
      type: DataTypes.DECIMAL(18, 2)
    },
    sulfur: {
      type: DataTypes.DECIMAL(18, 2)
    },
    water: {
      type: DataTypes.DECIMAL(18, 2)
    },
    flash: {
      type: DataTypes.INTEGER
    },
    mcr: {
      type: DataTypes.DECIMAL(18, 2)
    },
    na: {
      type: DataTypes.INTEGER
    },
    alsi: {
      type: DataTypes.INTEGER
    },
    van: {
      type: DataTypes.INTEGER
    },
    ocai: {
      type: DataTypes.INTEGER
    },
    volume: {
      type: DataTypes.INTEGER
    }

  });

  tankSpecs.associate = function (models) {
    tankSpecs.belongsTo(models.products, {
      foreignKey: {
        name: 'productId',
        allowNull: true
      },
      targetKey: 'id',
      constraints: false
    });

    tankSpecs.hasMany(models.products, {
      foreignKey: 'acceptableSpecsId'
    });
    tankSpecs.hasMany(models.tanks, {
      foreignKey: 'tankSpecsId'

    });
    tankSpecs.hasMany(models.operationsHistory, {
      foreignKey: 'specsId'
    });
  };

  return tankSpecs;
};
