/**
 * @description Базовый класс приложения
 */

import Sequelize from "../../Models";
import WhatsApp from "./WhatsApp";

export default class Main {
  Sequelize: any;
  WhatsApp: any;

  constructor() {
    this.Sequelize = Sequelize;
    this.WhatsApp = WhatsApp;
  }
}