import User from '@/models/User';
import db from '@/utils/db';
import { otpStorage } from './requestOtp';

export default async (req, res) => {

    await db.connect();
    const {email, otp} = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (otpStorage[email] && otpStorage[email] === otp) {
            delete otpStorage[email]; 
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }
        // if (user.Otp !== otp || user.OtpExpiry < Date.now()) {
        //     return res.status(400).json({ message: 'Invalid or expired OTP' });
        // }

        //user.Otp = undefined;
       // user.OtpExpiry = undefined;

        //await user.save();

       // res.status(200).json({ message: 'OTP verified' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    } 
};


