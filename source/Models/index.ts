/**
 * @description Экспорт моделей
 */

import fs from 'fs';
import path from 'path';
import sequelize from 'sequelize';

const Sequelize = new sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
  operatorsAliases: false,
  timezone: "+08:00",
  logging: false
});

fs
  .readdirSync(__dirname)
  .filter((folder: string) => {
    return (folder.indexOf('.') === -1);
  })
  .forEach((folder: string) => {
    Sequelize.import(path.join(__dirname, folder, 'index.js'));
  });

// Описание связей
const Code = Sequelize.models.code;
const CodeOperation = Sequelize.models.code_operation;
const User = Sequelize.models.user;

Code.belongsTo(User, { foreignKey: "fk_phone", targetKey: "phone" });
Code.belongsTo(CodeOperation, { foreignKey: "fk_operation_id", targetKey: "operation_id" });

/**
 * Синхронизация таблиц
 * Не использовать Sequelize.sync(), так как важен порядок!
 */
(async () => {
  await User.sync();
  await CodeOperation.sync();
  await Code.sync();
})();

/**
 * Служебные данные в таблицах
 */
let codes_operations = [
  {
    operation_id: 1,
    name: "Регистрация"
  },
  {
    operation_id: 2,
    name: "Авторизация"
  }
];

for (let row of codes_operations) {
  CodeOperation.findOrCreate({
    where: { operation_id: row.operation_id },
    defaults: { name: row.name }
  });
}

export default Sequelize;