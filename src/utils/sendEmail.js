import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });
  // 2) Define the email option
  const mailOptions = {
    from: 'Ye Khaing Win <yekhaingwin.dev@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
