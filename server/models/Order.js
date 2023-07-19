'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {}
  );
  
  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'orderItems',
    });

   
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  
  return Order;
};
