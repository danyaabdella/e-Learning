import db from '@/utils/db';
import Cart from '@/models/Cart';

export default async function handler(req, res) {
  await db.connect();

  if (req.method === 'POST') {
    try {
      const { email, courseId, isadded } = req.body;
      let cartItem = await Cart.findOne({ email, courseId });

      if (!cartItem) {
        const newCartItem = new Cart({ email, courseId, isadded });
        await newCartItem.save();
        res.status(201).json(newCartItem);
      } else {
        res.status(409).json({ message: 'Course already in the cart' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to add to cart' });
    }
  } else if (req.method === 'GET') {
    try {
      const { email } = req.query;
      const cartItems = await Cart.find({ email }).populate('courseId', 'courseName  coursePrice');
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cart items' });
    }
  } else if (req.method === 'DELETE') {
      try {
        const { email, courseId } = req.body;

        if (courseId) {
          // Case 1: Delete a specific course from the cart
          if (!email || !courseId) {
            return res.status(400).json({ error: 'Email and courseId are required.' });
          }

          const deleteResult = await Cart.deleteOne({ email, courseId });
    
          if (deleteResult.deletedCount === 1) {
            res.status(200).json({ message: 'Removed from cart' });
          } else {
            res.status(404).json({ error: 'Item not found in the cart' });
          }
        } else {
          // Case 2: Clear all items after payment
          if (!email) {
            return res.status(400).json({ error: 'Email is required to clear the cart.' });
          }

          await Cart.deleteMany({ email });
          res.status(200).json({ message: 'All items removed from cart after payment' });
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Failed to remove from cart' });
      }
    // try {
    //   const { email, courseId } = req.body;

    //   if (courseId) {
    //     // Deleting a specific course from the cart
    //     if (!email || !courseId) {
    //       return res.status(400).json({ error: 'Email and courseId are required.' });
    //     }

    //     const deleteResult = await Cart.deleteOne({ email, courseId });
  
    //     if (deleteResult.deletedCount === 1) {
    //       res.status(200).json({ message: 'Removed from cart' });
    //     } else {
    //       res.status(404).json({ error: 'Item not found in the cart' });
    //     }
    //   } else {
    //     // Removing all courses after payment
    //     if (!email) {
    //       return res.status(400).json({ error: 'Email is required to clear the cart.' });
    //     }

    //     await Cart.deleteMany({ email });
    //     res.status(200).json({ message: 'All items removed from cart after payment' });
    //   }
    // } catch (error) {
    //   console.error('Error removing from cart:', error);
    //   res.status(500).json({ error: 'Failed to remove from cart' });
    // }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
