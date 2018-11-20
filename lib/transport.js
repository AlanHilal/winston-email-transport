const Transport = require('winston-transport');
const nodemailer = require('nodemailer');

class MailTransport extends Transport{
    constructor(options){
        super(options);

        this._options = options || {}

        this.level = options.level || 'info'
        this._to = options.to
        this._from = options.from || `winston@mail`
        this._subject = options.subject || ''

        this.mailTransporter = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            secure: options.secure,
            auth: {
                user: options.user,
                pass: options.password
            }
        })
    }

    log(info, callback){
        let mailOptions = {
            from: this._from,
            to: this._to,
            subject: this._subject,
            text: info.message
        }

        this.mailTransporter.sendMail(mailOptions, callback)
    }
}

module.exports = MailTransport;