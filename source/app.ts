/**
 * @description Инициализация приложения
 */

require("dotenv").config();
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./Routes";

class Server {
  app: express.Application;

  constructor() {

    this.app = express(); // эксземпляр приложения express

    this.app.use(helmet()); // скрытие express из http-заголовков
    this.app.use(cookieParser()); // парсер кук
    this.app.use(bodyParser.json()); // парсер тела запроса

    this.routing();
  }

  /**
   * @description Инициализация маршрутов
   */
  public routing() {
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*"); // разрешение кроссдоменных запросов
      next();
    });

    for (const route of routes) {
      this.app.use(route);
    }
  }

  public start(port: number) {
    this.app.listen(port);
    console.log(`Сервер запущен на ${port} порту...`);
  }
}

new Server().start(Number(process.env.PORT));