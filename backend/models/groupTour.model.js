import mongoose, { mongo } from "mongoose";

const participantsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    enum: ["1st Payment", "2nd Payment", "Full Payment"], 
    default: "1st Payment",
  },
  airTicket: {
    type: Boolean,
    default: false,
  },
  visa: {
    type: Boolean,
    default: false,
  },
  foods: {
    type: String,
  },
  remarks: {
    type: String,
  },
  uploadedFiles: {
    type: [String], 
    default: [],
  },
})


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

  participants : [participantsSchema]

});

const GroupTours = mongoose.model("group_tour", groupTourSchema);

export default GroupTours;
