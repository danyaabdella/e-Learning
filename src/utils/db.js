// import mongoose from 'mongoose';

// // const connect = async () => {
// //   if (mongoose.connections[0].readyState) {
// //     console.log('Already connected to MongoDB');
// //     return;
// //   }
// //   try {
// //     await mongoose.connect(process.env.DATABASE_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log('Connected to MongoDB');
// //   } catch (error) {
// //     console.error('Error connecting to MongoDB:', error);
// //     throw new Error('MongoDB connection error');
// //   }
// // };

// // const disconnect = async () => {
// //   if (mongoose.connections[0].readyState) {
// //     await mongoose.disconnect();
// //     console.log('Disconnected from MongoDB');
// //   }
// // };

// // export default { connect, disconnect };

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URI);
//     console.log('Connected to MongoDB!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// };

// const disconnect = async () => {
//     if (mongoose.connections[0].readyState) {
//       await mongoose.disconnect();
//       console.log('Disconnected from MongoDB');
//     }
//   };
// export default {connect, disconnect};
import mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection error');
  }
};

// const disconnect = async () => {
//   if (mongoose.connections[0].readyState !== 0) {
//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   }
// };

export default { connect };
