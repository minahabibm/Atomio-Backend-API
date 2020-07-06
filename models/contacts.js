'use strict';

module.exports = (sequelize, DataTypes) => {
  const contacts = sequelize.define('contacts', {
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
    phone: {
      type: DataTypes.STRING(15)
    },
    email: {
      type: DataTypes.STRING(15)
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }

  });

  contacts.associate = function (models) {
    contacts.belongsToMany(models.orders, {
      through: 'ordersHasAgents',
      as: 'contactsOrder',
      foreignKey: 'contactsId'
    });
    contacts.belongsToMany(models.facilities, {
      through: 'facilitiesHasContacts',
      as: 'contactsFacilities',
      foreignKey: 'contactsId'
    });

    contacts.belongsTo(models.contactTypes, {
      foreignKey: 'typeId'
    });
    contacts.belongsTo(models.users, {
      foreignKey: 'createdBy'
    });
    contacts.belongsTo(models.users, {
      foreignKey: 'updatedBy'
    });

    contacts.hasMany(models.orders, {
      foreignKey: 'inspectorId'
    });
  };

  return contacts;
};
