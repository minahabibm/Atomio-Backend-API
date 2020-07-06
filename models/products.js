'use strict';

module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
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
    isFinished: {
      type: DataTypes.BOOLEAN
    },
    naexternalSystemName: {
      type: DataTypes.STRING(45)
    },
    externalSystemMaterial: {
      type: DataTypes.STRING(45)
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

  products.associate = function (models) {
    products.belongsToMany(models.orders, {
      through: 'ordersHasProducts',
      as: 'products',
      foreignKey: 'productsId'
    });

    products.belongsTo(models.productCategories, {
      foreignKey: 'categoryId'
    });
    products.belongsTo(models.tankSpecs, {
      foreignKey: 'acceptableSpecsId',
      targetKey: 'id'
    });
    products.belongsTo(models.users, {
      foreignKey: 'createdBy'
    });
    products.belongsTo(models.users, {
      foreignKey: 'updatedBy'
    });

    products.hasMany(models.tanks, {
      foreignKey: 'productId'
    });
    products.hasMany(models.tankSpecs, {
      foreignKey: 'productId',
      constraints: false
    });
  };

  return products;
};
