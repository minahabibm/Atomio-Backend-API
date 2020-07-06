'use strict';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.CHAR(32),
      unique: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, { timestamps: false });


  users.associate = function (models) {
    users.belongsTo(models.areas, {
      foreignKey: 'defaultLocationId'
    });

    // eslint-disable-next-line no-unused-expressions
    users.hasMany(models.orders, {
      foreignKey: 'createdBy'
    });
    users.hasMany(models.orders, {
      foreignKey: 'updatedBy'
    });
    users.hasMany(models.products, {
      foreignKey: 'createdBy'
    });
    users.hasMany(models.products, {
      foreignKey: 'updatedBy'
    });
    users.hasMany(models.tanks, {
      foreignKey: 'createdBy'
    });
    users.hasMany(models.tanks, {
      foreignKey: 'updatedBy'
    });
    users.hasMany(models.compartments, {
      foreignKey: 'createdBy'
    });
    users.hasMany(models.compartments, {
      foreignKey: 'updatedBy'
    });
    users.hasMany(models.barges, {
      foreignKey: 'createdBy'
    });
    users.hasMany(models.barges, {
      foreignKey: 'updatedBy'
    });
    users.hasMany(models.contacts, {
      foreignKey: 'createdBy'
    });
    users.hasMany(models.contacts, {
      foreignKey: 'updatedBy'
    });
    users.hasMany(models.facilities, {
      foreignKey: 'createdBy'
    });
    users.hasMany(models.facilities, {
      foreignKey: 'updatedBy'
    });
  };

  return users;
};
