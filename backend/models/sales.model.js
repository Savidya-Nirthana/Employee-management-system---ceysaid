import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
});



const OperationAcceptance = mongoose.Schema({
  category: {
    type: String,
    default: "acceptance",
  },

  isText: {
    type: Boolean,
    default: false,
  },

  flights: [
    {
      arrival: {
        time: { type: String, default: "" },
      },
      departure: {
        dateTime: { type: String, required: true },
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
      flight: { type: String, required: true },
    },
  ],

  hotels: {
    type: [String],
    default: [],
  },

  itenary: {
    type: [String],
    default: [],
  },

  package: {
    type: [String],
    default: [],
  },

  special: {
    type: [String],
    default: [],
  },

  attachements: {
    type: [String],
    default: [],
  },
});

const OperationConfirmation = mongoose.Schema({
  category: {
    type: String,
    default: "confirmation",
  },
  attachements: {
    type: [fileSchema],
    default: [],
  },
});

  const opProcessing = mongoose.Schema({
  category: {
    type: String,
    default: "processing",
  },
  type: {
    type: String,
    required: true,
  },
  attachements: {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
});

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
      type: [String],
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
      contactMethod: {
        type: String,
        required: true,
      },
      contactDetails: {
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
    priority: {
      type: String,
      default: "Low",
      required: true,
    },
    isLocked: {
      type: Boolean,
      default: false,
      required: true,
    },
    lockedBy: {
      type: String,
      default: null,
    },
    lockedAt: {
      type: Date,
      default: null,
    },

    approvedBy: {
      type: String,
      defaultL: null,
    },

    logs: {
      acceptance: [OperationAcceptance],
      confirmation: [OperationConfirmation],
      processing: [opProcessing],
    },
  },
  {
    timestamps: true,
  }
);

const SalesModel = mongoose.model("sales_data", salesSchema);
export default SalesModel;