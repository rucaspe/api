/**
 * @description Работа с авторизацией
 */

import { Main } from "../../Classes";
import bcrypt from "bcrypt";
import moment from "moment";

export default class Auth extends Main {
  user: any;
  code: any;

  constructor() {
    super();

    this.user = this.Sequelize.models.user;
    this.code = this.Sequelize.models.code;
  }

  /**
   * @description Регистрация
   */
  public async signup({
    name,
    phone,
    email,
    password
  }: {
    name: string,
    phone: string,
    email: string,
    password: string
  }) {
    // Валидация данных
    const phone_check = /^[0-9]{11}$/;
    const email_check = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i;

    if (!phone_check.test(phone)) throw new Error("Номер телефона должен состоять из 11 цифр");
    if (!email_check.test(email)) throw new Error("Некорректный email");
    if (password.length < 6) throw new Error("В пароле должно быть не менее 6 символов");

    const passwordHash = await bcrypt.hash(password, 10);

    const result: any = await this.user.findOrCreate({
      where: {
        [this.Sequelize.Op.or]: [
          { phone },
          { email }
        ]
      },
      defaults: {
        name,
        phone,
        email,
        password: passwordHash
      }
     });

    const user = result[0];
    const created = result[1];

    if (!created) {
      if (user.phone === phone) throw new Error("Такой номер телефона уже зарегистрирован");
      if (user.email === email) throw new Error("Такой email уже зарегистрирован");
    }

    // Отправка кода подтверждения
    this.sendCode({
      operation_id: 1,
      phone: user.phone
    });

    return true;
  }

  /**
   * @description Отправка кода подтверждения в WhatsApp
   */
  public async sendCode({ operation_id, phone }: { operation_id: number, phone: string }) {
    const data: any = await this.code.findOrCreate({
      where: {
        fk_phone: phone,
        fk_operation_id: operation_id,
        lifetime: {
          [this.Sequelize.Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        confirmed: false
      },
      limit: 1,
      order: [
        ["code_id", "DESC"]
      ],
      defaults: {
        code: String(Math.round(10000 - 0.5 + Math.random() * (99999 - 10000 + 1))),
        lifetime: moment().add(5, "minutes").format("YYYY-MM-DD HH:mm:ss")
      }
    });

    this.WhatsApp.sendMessage(phone, `Код подтверждения: ${data[0].code}`);

    return true;
  }
}