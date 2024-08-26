// utils/nodemailer.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service you use
  auth: {
    user: process.env.EMAIL, // your email address
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
