'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'order_id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'product_id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      item_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {}
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
  }
  
  return OrderItem;
};
