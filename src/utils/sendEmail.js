// utils/nodemailer.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service you use
  auth: {
    user: process.env.EMAIL, // your email address
    pass: process.env.EMAIL_PASSWORD, // your email password
  },
});

const sendEmail = async (to, subject, text, userId, email) => {
  
  const approveUrl = `${process.env.BASE_URL}/approveUser?userId=${userId}`; // URL to the admin approval page

  const html = `
    <p>A new instructor has signed up with the email: <strong>${email}</strong>.</p>
    <p>Please review their account documentation and approve their account:</p>
    <a href="${approveUrl}" onClick={handleLogout} style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Visit</a>
  `;
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
