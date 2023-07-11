import { createMailTransporter } from './createMailTransporter.js';

const sendVerificationEmail = (user) => {
  let baseUrl;
  console.log('running sendVerificationEmail');
  const transporter = createMailTransporter();

  process.env.NODE_ENV === 'production' ? (baseUrl = 'https://trail-journal.azurewebsites.net/') : (baseUrl = 'http://localhost:3000');

  const mailOptions = {
    from: '"Trail Journal - Verification" <justjoedev@hotmail.com>',
    to: user.email,
    subject: 'Trail Journal - Verify your email',
    html: `<p>Hello ${user.username}! Please verify your email by clicking this link:</p>
        <a href='${baseUrl}/verify?emailToken=${user.emailToken}'>Verify Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Verification email sent');
    }
  });
};

export { sendVerificationEmail };
