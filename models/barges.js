'use strict';

module.exports = (sequelize, DataTypes) => {
  const barges = sequelize.define('barges', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    externalSystemMode: {
      type: DataTypes.STRING(5)
    },
    owner: {
      type: DataTypes.STRING(45)
    }

  });

  barges.associate = function (models) {
    barges.belongsTo(models.users, {
      foreignKey: 'createdBy'
    });
    barges.belongsTo(models.users, {
      foreignKey: 'updatedBy'
    });
    barges.belongsTo(models.contacts, {
      foreignKey: 'vesselContactId'
    });
    barges.belongsTo(models.orders, {
      foreignKey: 'externalSystemNominationId',
      foreignKeyConstraint: true
    });
  };

  return barges;
};
