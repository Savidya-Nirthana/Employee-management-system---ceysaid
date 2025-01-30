import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    //
})


User = mongoose.model("users", userSchema);
export default User;