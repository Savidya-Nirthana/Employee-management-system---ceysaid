import mongoose, { mongo } from "mongoose";

const groupTourSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalSheets: {
    type: Number,
    required: true,
  },
  booked: {
    type: Number,
    required: true,
  },
  publishDate: {
    type: Date,
    default: new Date(),
  },
  post: {
    type: String,
    required: true,
  },
});

const GroupTours = mongoose.model("group_tour", groupTourSchema);

export default GroupTours;
