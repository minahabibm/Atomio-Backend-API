'use strict';

module.exports = (sequelize, DataTypes) => {
  const regions = sequelize.define('regions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      unique: true
    }

  }, { timestamps: false });

  regions.associate = function (models) {
    regions.hasMany(models.areas, {
      foreignKey: 'regionId'
    });
  };

  return regions;
};
