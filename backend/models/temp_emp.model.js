import mongoose from "mongoose";
import bcrypt from "bcrypt";

const temp_employer_schema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    corporateTitle: {
      type: String,
    },
    dateJoined: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
    },
    employeeType: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      requirde: true,
    },
  },
  {
    timestamps: true,
  }
);

temp_employer_schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

temp_employer_schema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const tempEmployer = mongoose.model("TempEmployee", temp_employer_schema);
export default tempEmployer;
