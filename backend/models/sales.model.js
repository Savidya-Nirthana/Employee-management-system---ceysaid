import mongoose from "mongoose";

const salesSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    mainCities: {
      type: String,
      required: true,
    },
    no_pax: {
      adult: {
        type: Number,
        default: 0,
      },
      child: {
        type: Number,
        default: 0,
      },
      infant: {
        type: Number,
        default: 0,
      },
    },
    noDays: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    additionalInfo: {
      type: String,
      required: true,
    },
    customerDetails: {
      name: {
        type: String,
        required: true,
      },
      contactDetail: {
        type: String,
        required: true,
      },
      lead: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      default: "pending",
    },
    urgent: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SalesModel = mongoose.model("sales_data", salesSchema);
export default SalesModel;
