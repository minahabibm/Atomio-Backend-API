'use strict';

module.exports = (sequelize, DataTypes) => {
  const ordersHasProducts = sequelize.define('ordersHasProducts', {
    quantity: {
      type: DataTypes.INTEGER
    }

  });
  return ordersHasProducts;
};
