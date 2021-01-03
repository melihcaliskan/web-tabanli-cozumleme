'use strict';
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: async function(user, options) {
          // Parolayı kaydetmeden önce şifrele
          user.password = await bcrypt.hashSync(user.password, 10);
        },
      },
    },
  );
  users.associate = function(models) {
    // Kullanıcının paylaşımları
    users.hasMany(models.posts, { as: 'posts' });
  };
  return users;
};
