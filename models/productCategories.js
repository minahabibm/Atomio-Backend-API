'use strict';

module.exports = (sequelize, DataTypes) => {
  const productCategories = sequelize.define('productCategories', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false
    }
  }, { timestamps: false });

  productCategories.associate = function (models) {
    productCategories.hasMany(models.products, {
      foreignKey: 'categoryId'
    });
    productCategories.hasMany(models.compartments, {
      foreignKey: 'categoryId'
    });
  };

  return productCategories;
};
