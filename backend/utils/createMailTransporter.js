import nodemailer from 'nodemailer';

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    secure: false,
    auth: {
      user: 'justjoedev@hotmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3',
    },
  });

  return transporter;
};

export { createMailTransporter };
