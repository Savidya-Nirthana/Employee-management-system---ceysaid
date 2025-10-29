import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({
  userId: {
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
  comments : {
    type: String
  },
  status : {
    type: String,
    enum : ["pending", "approved", "rejected"],
    default: "pending"
  },
  appliedAt : {
    type: Date,
    default: Date.now
  }, 
  approvedBy : {
    type: String
  }
},
{
  timestamps: true
});


const LeaveModel = mongoose.model('leave', leaveSchema);

export default LeaveModel;
