import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  // 2) Define the email option
  const mailOptions = {
    from: 'TOSS <yekhaingwinn@gmail.com>',
    to: options.recipients,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };
  // 3) Send the email
  const email = await transporter.sendMail(mailOptions);

  console.log(`Mail sent: ${email.messageId}`);
};

export default sendEmail;
