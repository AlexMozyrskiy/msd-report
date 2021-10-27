const nodeMailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // обязательно подробно потом почитать про это свойство
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + process.env.CLIENT_URL,
      text: '',
      html: `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
    });
  }

  async sendForgotPasswordMail(to, login, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Восстановление пароля на ' + process.env.CLIENT_URL,
      text: '',
      html: `
          <div>
            <h1>Для восстановления пароля перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
            <p>Ваш логин на сервисе: ${login}</p>
          </div>
        `,
    });
  }

  async sendCoinsAddMail(to, login, addedCoins, totalCoinsCount) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Добавлены монеты на ' + process.env.CLIENT_URL,
      text: '',
      html: `
          <div>
            <h1>Вам Добавлены монеты</h1>

            <p>Количество добавленных монет: ${addedCoins}</p>
            <p>Всего монет на сервисе: ${totalCoinsCount}</p>
            <p>Ваш логин на сервисе: ${login}</p>
          </div>
        `,
    });
  }
}

module.exports = new MailService();
