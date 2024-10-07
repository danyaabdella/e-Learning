import db from '@/utils/db';
import Enrollment from '@/models/Enrollment';

export default async function handler(req, res) {
  const { method } = req;

  await db.connect();

  if (method=='POST') {
      try {
        const { userId, email, courseId, order_number, price, paymentId, payment_status } = req.body;

        const newEnrollment = new Enrollment({
          userId,
          email, // Wrap userId in an array
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
        const { email } = req.query;
  
        // Fetch the enrollment details for the user and populate course information
        const enrollments = await Enrollment.find({ email:email }).populate('courseId','courseName image instructor chapters');
  
        res.status(200).json({ status: 'success', data: enrollments });
      } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching enrollments' });
      }
    } else if (method === 'PUT') {
      try {
        const { courseId, isCompleted } = req.body;
  
        // Update the enrollment status for the course
        const updatedEnrollment = await Enrollment.findOneAndUpdate(
          { 'courseId': courseId }, // Use the courseId to find the enrollment
          { isCompleted: isCompleted }, // Update the isCompleted field
          { new: true } // Return the updated document
        );
  
        if (!updatedEnrollment) {
          return res.status(404).json({ status: 'error', message: 'Enrollment not found' });
        }
  
        res.status(200).json({ status: 'success', data: updatedEnrollment });
      } catch (error) {
        console.error('Error updating enrollment status:', error);
        res.status(500).json({ status: 'error', message: 'Error updating enrollment status' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      
  }
}
