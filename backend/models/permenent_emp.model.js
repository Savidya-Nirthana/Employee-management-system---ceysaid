import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },

    address: {
      houseNo: {
        type: String,
        required: true,
      },

      street1: {
        type: String,
        required: true,
      },

      street2: {
        type: String,
      },

      city: {
        type: String,
        required: true,
      },

      district: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      gsDivision: {
        type: String,
        required: true,
      },

      gnDivision: {
        type: String,
        required: true,
      },
    },

    telephone: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    nic: {
      type: String,
      required: true,
      unique: true,
    },

    nationality: {
      type: String,
      required: true,
    },

    religion: {
      type: String,
      required: true,
    },

    corporateDetails: {
      corporateTitle: {
        type: String,
      },

      location: {
        type: String,
      },

      dateJoined: {
        type: Date,
      },

      department: {
        type: String,
      },

      employeeType: {
        type: String,
        enum: ["permenant", "temporary"],
        required: true,
      },
    },

    attachments: {
      employeeImage: {
        type: String,
      },

      nicImage: {
        type: String,
      },

      gramaNiladhariCertificate: {
        type: String,
      },

      letterOfAppointment: {
        type: String,
      },

    },

    profile_status: {
      type: String,
      default: "pending",
      required: true,
    },

    role: {
        type: String,
        default: "sales",
        required: true
    }, 

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const PermenentUser = mongoose.model("permenent_user", userSchema);
export default PermenentUser;
