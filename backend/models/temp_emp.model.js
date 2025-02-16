import mongoose from "mongoose";
import bcrypt from "bcrypt";

const temp_employer_schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    corporateTitle: {
      type: String,
      required: true,
    },
    dateJoined: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
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
