import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Successfully connected");
  } catch (e) {
    console.error(e);
  }
};

export default databaseConnection;

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.DB_CONNECTION;

// if (!MONGODB_URI) {
//   throw new Error("Please define the DB_CONNECTION environment variable");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const databaseConnection = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//       maxPoolSize: 10, // Important for serverless performance
//     }).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// };

// export default databaseConnection;
