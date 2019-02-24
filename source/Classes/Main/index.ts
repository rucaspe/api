/**
 * @description Базовый класс приложения
 */

import Sequelize from "../../Models";

export default class Main {
  Sequelize: any;
  user: any;
  confirmation: any;

  constructor() {
    // Модели
    this.Sequelize = Sequelize;
    this.user = Sequelize.models.user;
    this.confirmation = Sequelize.models.confirmation;
  }
}