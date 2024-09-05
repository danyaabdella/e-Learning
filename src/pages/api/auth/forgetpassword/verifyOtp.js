import User from '@/models/User';
import db from '@/utils/db';
import otpStorage from './otpStorage'; // Import otpStorage

export default async (req, res) => {
    await db.connect();
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const storedOtp = await client.get(email);
        console.log(`Stored OTP: ${otpStorage[email]}, Provided OTP: ${otp}`);

        if (storedOtp && storedOtp === otp) {
            // delete otpStorage[email]; // Remove OTP after successful verification
            await client.del(email);
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
