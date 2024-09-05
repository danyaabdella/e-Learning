import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import db from '../../../utils/db';


export default async function handler(req, res){
        const{ method } = req;
        await db.connect();
        try {
            switch (method) {
                case 'POST':
                    const { email, password } = req.body;
                    const user = await User.findOne({ email });
    
                    if (!user) {
                        return res.status(401).json({ message: 'Invalid email or password' });
                    }
    
                    const isMatch = await bcrypt.compare(password, user.password);
    
                    if (!isMatch) {
                        return res.status(401).json({ message: 'Invalid email or password' });
                    }
                  
                    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const userID = user._id;
                    const Email = user.email;
                    // Determine the redirect URL based on the user's role
                    // const redirectUrl = user.role === 'admin' ? '/adminPage' : '/dashboard';
                    let redirectUrl ;
                    if (user.role === 'admin') {
                        redirectUrl = '/adminPage';
                      } else if (user.role === 'instructor') {
                        redirectUrl = '/instructorPage';
                      } else {
                        redirectUrl = '/userPage';
                      }
                    return res.status(200).json({ token, redirectUrl, userID, Email });
                
                case 'GET':
                    const authToken = req.headers.authorization?.split(' ')[1]; // Extract token from header
                    if (!authToken) {
                        return res.status(401).json({ message: 'Unauthorized' });
                    }
    
                    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
                    const userId = decodedToken.userId;
    
                    const userData = await User.findById(userId);
                    if (!userData) {
                        return res.status(404).json({ message: 'User not found' });
                    }
    
                    return res.status(200).json({ user: userData, role: userData.role });
    
                default:
                    return res.status(405).json({ message: 'Method not allowed' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
         


}
        



//export default handler;

