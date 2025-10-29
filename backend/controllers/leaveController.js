import asyncHandler from "express-async-handler";
import LeaveModel from "../models/leave.model.js";

// for : apply leave
// access : authorized users
// uli : api/v1/leave/apply
// method : POST

export const applyLeave = asyncHandler(async (req, res) => {
  const data = await req.body.leaveData;
  const leaveData = await LeaveModel.create({
    userId: res.user.user.userId,
    year: data.leaveYear,
    leave_type: data.leaveType,
    startDate: data.leaveFrom,
    endDate: data.leaveTo,
    reason: data.reason,
    comments: data.comments,
    status: "pending",
  });
  console.log(leaveData);
  res.status(200).json({ message: leaveData });
});

export const fetchLeaves = asyncHandler(async (req, res) => {
  try {
    const leaves = await LeaveModel.find({ status: "pending" });
    res.status(200).json({ leaves });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
