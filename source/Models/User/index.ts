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
    phone_confirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      notEmpty: true
    },
    email_confirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["phone"]
      },
      {
        unique: true,
        fields: ["email"]
      }
    ],
    freezeTableName: true,
    tableName: "users",
    underscored: true
  });

  return User;
}