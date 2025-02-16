import databaseConnection from "./config/connection.js";
import bcrypt from "bcrypt";
import TempUser from "./models/temp_user.model.js";

const userRegister = async () => {
  databaseConnection();
  try {
    const hashedPassWord = await bcrypt.hash("emp1", 10);
    const newUser = new TempUser({
      username: "emp1",
      password: hashedPassWord,
      role: "employer",
    });

    await newUser.save();
  } catch (e) {
    console.error(e);
  }
};

userRegister();
