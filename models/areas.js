'use strict';

module.exports = (sequelize, DataTypes) => {
  const areas = sequelize.define('areas', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45)
    }
  }, { timestamps: false });

  areas.associate = function (models) {
    areas.belongsTo(models.regions, {
      foreignKey: 'regionId'
    });

    areas.hasMany(models.users, {
      foreignKey: 'defaultLocationId'
    });
    areas.hasMany(models.orders, {
      foreignKey: 'locationId'
    });
    areas.hasMany(models.facilities, {
      foreignKey: 'areaId'
    });
  };

  return areas;
};
