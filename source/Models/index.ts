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
const User = Sequelize.models.user;
const Confirmation = Sequelize.models.confirmation;

Confirmation.belongsTo(User, { foreignKey: "fk_user_id", targetKey: "user_id" });

/**
 * Синхронизация таблиц
 * Не использовать Sequelize.sync(), так как важен порядок!
 */
(async () => {
  await User.sync();
  await Confirmation.sync();
})();

export default Sequelize;