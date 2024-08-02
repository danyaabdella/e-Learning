import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';



export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            await db.connect();

            const { email,password } = req.body;
            const existingUser = await User.findOne({ email });
            if(existingUser){
                const hashedPassword = await bcrypt.hash(password, 12);
                await User.findOneAndUpdate(
                { email },
                { $set: { password: hashedPassword } }
                );

                res.status(201).json({ message: 'Password reset!' });
                    } else {
                        res.status(201).json({ message: 'User does not exist!' }); 
                    }
        } catch(error) {
            res.status(500).json({ message: 'Internal server error' });
         
        }

    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}