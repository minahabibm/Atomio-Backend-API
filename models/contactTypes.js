'use strict';

module.exports = (sequelize, DataTypes) => {
  const contactTypes = sequelize.define('contactTypes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, { timestamps: false });


  contactTypes.associate = function (models) {
    contactTypes.hasMany(models.contacts, {
      foreignKey: 'typeId'
    });
  };

  return contactTypes;
};
