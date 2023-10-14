import nodemailer from 'nodemailer';
import {mailConfig} from '../database/config'
  const mailService = {
    async sendMail (emailTo, subject, text, html) {
      console.log(mailConfig);
      const transporter = nodemailer.createTransport(mailConfig);
  
      transporter.sendMail({
        from: process.env.SMTP_USER,
        to: emailTo,
        subject,
        text: text || '',
        html: html || ''
      }, (err, info) => {
        if (err) {
          console.log(err);
          throw new Error('Error');
        } else {
          console.log(info);
        }
      }
      );
    }
  }

export default mailService;