import mongoose, { mongo } from "mongoose";

const groupTourSchema = mongoose.Schema({
  userId: {
    type:String,
    required: true
  },
  name: {
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
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  available: {
    type: Number,
    default: 0,
    required: true,
  },
  flyer: {
    type: String,
    required: false,
  },
  pdf: {
    type: String,
    required: false,
  },
});

const GroupTours = mongoose.model("group_tour", groupTourSchema);

export default GroupTours;
