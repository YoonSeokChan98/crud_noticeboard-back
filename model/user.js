import { DataTypes, Sequelize } from 'sequelize';

const UserModel = (sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userStatus: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
      allowNull: true,
    },
  });
  return User;
};

export default UserModel;
