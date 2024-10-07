// utils/sendEmail.js
import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text, html) => {
  try {
    // Create a transporter object using the SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // you can use any email service like SendGrid, Mailgun, etc.
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.EMAIL_PASSWORD, // your email password
      },
    });

    // Define the email options
    let mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to, // receiver address
      subject, // Subject line
      text, // plain text body
      html, // HTML body
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;
