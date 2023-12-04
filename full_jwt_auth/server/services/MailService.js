// Сервисы нужны чтобы контроллеры не были слишком "толстыми" (с большим нагромождением логики)
import nodemailer from 'nodemailer';

class MailService {
    // Получает email и ссылку, затем отправляет ссылку на email
    async sendActivationMail(to, link) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            // Указываем почту от кого
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>Для активации пройдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
        });
    }
}

export default new MailService();
