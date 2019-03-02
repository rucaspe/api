/**
 * @description Класс для работы с API WhatsApp
 */

import axios from "axios";

export default class WhatsApp {
  apiUrl: string;
  apiToken: string;

  constructor(apiUrl: string, apiToken: string) {
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;
  }

  /**
   * @description Отправка сообщения
   */
  public sendMessage(phone: string, body: string) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: `${this.apiUrl}/sendMessage`,
        params: {
          token: this.apiToken
        },
        data: { phone, body }
      }).then((res: any) => {
        resolve(res.data);
      }).catch((err: any) => {
        reject(err);
      });
    }); 
  }
}