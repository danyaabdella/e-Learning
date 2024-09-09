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
          courseId: courseId, // Already an array
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
      
    } else if(method=='GET') {
      try {
        const { userId } = req.query;
  
        // Fetch the enrollment details for the user and populate course information
        const enrollments = await Enrollment.find({ userId }).populate('courseId').exec();
  
        res.status(200).json({ status: 'success', data: enrollments });
      } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching enrollments' });
      }
    }else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      
  }
}
