import db from '@/utils/db';
import Enrollment from '@/models/Enrollment';

export default async function handler(req, res) {
  const { method } = req;

  await db.connect();

  if (method=='POST') {
      try {
        const { userId, courseId, order_number, price, paymentId, payment_status } = req.body;

        const newEnrollment = new Enrollment({
          userId, // Wrap userId in an array
          courseId: courseIds, // Already an array
          order_number,
          price,
          paymentId,
          payment_status,
          status: payment_status, // Initially set status same as payment status
          payment_via: 'Chapa', // Update if needed based on your application
        });

        await newEnrollment.save();
        res.status(201).json({ status: 'success', data: newEnrollment });
      } catch (error) {
        console.error('Error saving enrollment:', error);
        res.status(500).json({ status: 'error', message: 'Error saving enrollment' });
      }
      
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      
  }
}
