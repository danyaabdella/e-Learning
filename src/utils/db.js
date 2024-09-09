
import mongoose from 'mongoose';

// const connect = async () => {
//   if (mongoose.connections[0].readyState) {
//     console.log('Already connected to MongoDB');
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.DATABASE_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw new Error('MongoDB connection error');
//   }
// };



// export default { connect };
const MONGO_URI = process.env.DATABASE_URI;

const connect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw new Error('Database connection error');
  }
};

export default { connect };
