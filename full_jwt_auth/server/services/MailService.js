// Сервисы нужны чтобы контроллеры не были слишком "толстыми" (с большим нагромождением логики)
import nodemailer from "nodemailer";

class MailService {

    constructor() {
        // С помощью этого поля отправляем письма на почту
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    // Получает email и ссылку, затем отправляет ссылку на email
    async sendActivationMail(to, link) {

    }
}

export default new MailService();
