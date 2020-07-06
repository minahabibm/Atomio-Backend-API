'use strict';

module.exports = (sequelize, DataTypes) => {
  const facilities = sequelize.define('facilities', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(10),
      unique: true
    },
    name: {
      type: DataTypes.STRING(45)
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }

  });

  facilities.associate = function (models) {
    facilities.belongsToMany(models.contacts, {
      through: 'facilitiesHasContacts',
      as: 'facilities',
      foreignKey: 'facilityId'
    });
    facilities.belongsTo(models.areas, {
      foreignKey: 'areaId'
    });
    facilities.belongsTo(models.users, {
      foreignKey: 'createdBy'
    });
    facilities.belongsTo(models.users, {
      foreignKey: 'updatedBy'
    });

    facilities.hasMany(models.tanks, {
      foreignKey: 'facilityId'
    });
  };

  return facilities;
};
