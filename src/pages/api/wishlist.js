import Wishlist from '@/models/Wishlist';
import db from '@/utils/db';

export default async (req,res) => {
    const {method} = req;
    await db.connect();

    if(method==='POST') {
        const {email, courseId} = req.body;
        
        const wish = new Wishlist({
            email,
            courseId,
        })
        await wish.save();
        return res.status(201).json(wish);

    } else if(method==='DELETE') {
        const {email, courseId} = req.body;
        const deletedWishlistItem = await Wishlist.findOneAndDelete({email,courseId});
        if (!deletedWishlistItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
          }
  
          return res.status(200).json({ message: 'Wishlist item deleted successfully' });
    } else if(method==='GET') {
        const { email } = req.query;

        const wishlistItems = await Wishlist.find({ email }).populate('courseId', 'image courseName courseCode');

        return res.status(200).json(wishlistItems);
    } else {
        return res.status(500).json( {message: 'Internal server error'});
    }

}