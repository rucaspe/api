/**
 * @description Код подтверждения
 */

export default (sequelize: any, Sequelize: any) => {
  const Code = sequelize.define("code", {
    code_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      notEmpty: true
    },
    fk_phone: {
      type: Sequelize.STRING(11),
      allowNull: false,
      notEmpty: true
    },
    fk_operation_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    code: {
      type: Sequelize.INTEGER(5),
      allowNull: false,
      notEmpty: true
    },
    lifetime: {
      type: Sequelize.DATE,
      allowNull: false,
      notEmpty: true
    },
    confirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    }
  }, {
    indexes: [
      {
        fields: ["code"]
      },
      {
        fields: ["lifetime"]
      }
    ],
    freezeTableName: true,
    tableName: "codes",
    underscored: true
  });

  return Code;
}