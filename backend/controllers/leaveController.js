import asyncHandler from "express-async-handler";
import LeaveModel from "../models/leave.model.js";

// for : apply leave
// access : authorized users
// uli : api/v1/leave/apply
// method : POST

export const applyLeave = asyncHandler(async (req, res) => {
  const data = await req.body.leaveData;
  console.log(res.user.user.username);
  const leaveData = await LeaveModel.create({
    email: res.user.user.username,
    year: data.leaveYear,
    leave_type: data.leaveType,
    startDate: data.leaveFrom,
    endDate: data.leaveTo,
    reason: data.reason,
    comments: data.comments,
    status: "pending",
  });
  res.status(200).json({ message: leaveData });
});

