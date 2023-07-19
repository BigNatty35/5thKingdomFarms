const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: 'user_id',
      as: 'order',
    });
  };

  return User;
}