import Task from '../../models/Task';
import db from '../../../utils/db';

export default async (req, res) => {
  const { method } = req;

  await db.connect();

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'POST':
      try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...data } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }

  await db.disconnect();
};
