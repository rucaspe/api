/**
 * @description Подтверждение
 */

export default (sequelize: any, Sequelize: any) => {
  const Confirmation = sequelize.define("confirmation", {
    fk_user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    field: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    confirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      notEmpty: true
    }
  }, {
    freezeTableName: true,
    tableName: "confirmations",
    underscored: true
  });

  return Confirmation;
}