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
