/**
 * @description Экземпляр класса WhatsApp для Main
 */

import WhatsApp from "../WhatsApp";

export default new WhatsApp(process.env.WA_API_URL, process.env.WA_API_TOKEN);