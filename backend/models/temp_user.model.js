import mongoose from "mongoose";
import bcrypt from "bcrypt";
const tempuser = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
});

tempuser.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
const TempUser = mongoose.model("tempUsers", tempuser);
export default TempUser;
