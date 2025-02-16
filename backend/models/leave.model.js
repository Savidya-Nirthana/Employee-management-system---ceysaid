import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  leave_type: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
  comments : {
    type: String
  }
});


const LeaveModel = mongoose.model('leave', leaveSchema);

export default LeaveModel;
