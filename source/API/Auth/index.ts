/**
 * @description Работа с авторизацией
 */

import { Main } from "../../Classes";
import bcrypt from "bcrypt";

export default class Auth extends Main {
  constructor() {
    super();
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

    const verifiable_fields = ["phone", "email"];

    for (let field of verifiable_fields) {
      this.confirmation.create({
        fk_user_id: user.user_id,
        field
      });
    }

    return true;
  }
}