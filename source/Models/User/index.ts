/**
 * @description Пользователь
 */

export default (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("user", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    phone: {
      type: Sequelize.STRING(11),
      allowNull: false,
      notEmpty: true
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      notEmpty: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }
  }, {
    freezeTableName: true,
    tableName: "users",
    underscored: true
  });

  return User;
}