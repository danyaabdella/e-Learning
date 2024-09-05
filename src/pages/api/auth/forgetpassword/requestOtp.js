import nodemailer from 'nodemailer';
import User from '@/models/User';
import db from '@/utils/db';
import crypto from 'crypto';
// import otpStorage from './otpStorage';
import client from './otpStorage';
// Define otpStorage outside the function scope
// let otpStorage = {}; // In-memory storage for OTPs

const requestOtp = async (req, res) => {
    await db.connect();
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = crypto.randomBytes(3).toString('hex'); 
        // otpStorage[email] = otp; // Store OTP in-memory
        await client.set(email, otp, 'EX', 600);
        console.log(`OTP for ${email}: ${otp}`);

        // Setup Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `Verification code is ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Internal server error', error });
    } 
};

// export { otpStorage };
export default requestOtp;
