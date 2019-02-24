/**
 * @description Базовый класс приложения
 */

import Sequelize from "../../Models";

export default class Main {
  user: any;

  constructor() {
    this.user = Sequelize.models.user;
  }
}