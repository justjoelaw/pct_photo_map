import { createMailTransporter } from './createMailTransporter.js';

const sendVerificationEmail = (user) => {
  console.log('running sendVerificationEmail');
  const transporter = createMailTransporter();
  // console.log(transporter);

  const mailOptions = {
    from: '"Trail Map - Test" <justjoedev@hotmail.com>',
    to: user.email,
    subject: 'Trail Map - Verify your email',
    html: `<p>Hello ${user.username}! Please verify your email by clicking this link:</p>
        <a href='http://localhost:3000/verify?emailToken=${user.emailToken}'>Verify Email</a>`,
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
