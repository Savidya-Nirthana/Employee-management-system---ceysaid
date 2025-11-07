import asyncHandler from "express-async-handler";
import LeaveModel from "../models/leave.model.js";

// for : apply leave
// access : authorized users
// uli : api/v1/leave/apply
// method : POST

export const applyLeave = asyncHandler(async (req, res) => {
  const data = await req.body.leaveData;
  const { userId } = res.user.user;
  console.log(userId);
  try {
    const user = await LeaveModel.findOne({ userId: userId });
    const leave = {
      userId: res.user.user.userId,
      year: data.leaveYear,
      leave_type: data.leaveType,
      half_day: data.half_day,
      startDate: data.leaveFrom,
      endDate: data.leaveTo,
      reason: data.reason,
      comments: data.comment,
      status: "pending",
    };
    if (user) {
      user.leaves.push(leave);
      await user.save();
      return res
        .status(200)
        .json({ message: "Leave application submitted successfully!" });
    } else {
      const newLeaveRecord = new LeaveModel({
        userId: userId,
        leaves: [leave],
      });
      await newLeaveRecord.save();
      return res
        .status(200)
        .json({ message: "Leave application submitted successfully!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const fetchLeaves = asyncHandler(async (req, res) => {
  try {
    const leaves = await LeaveModel.aggregate([
      { $unwind: "$leaves" },
      { $match: { "leaves.status": "pending" } },
      {
        $lookup: {
          from: "permenent_users",
          localField: "userId", // ✅ correct field to join on
          foreignField: "userId",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $project: {
          _id: 0,
          leaveId: "$leaves._id",
          userId: "$employee.userId",
          fullName: "$employee.fullName",
          img: "$employee.attachments.employeeImage",
          department: "$employee.corporateDetails.department",
          startDate: "$leaves.startDate",
          endDate: "$leaves.endDate",
          leaveType: "$leaves.leave_type",
          reason: "$leaves.reason",
          status: "$leaves.status",
        },
      },
    ]);
    res.status(200).json({ leaves: leaves });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const leaveAccept = asyncHandler(async (req, res) => {
  const { leaveId } = req.body;
  const { userId } = res.user.user;
  console.log("Approving leave by user:", userId);
  try {
    const leave = await LeaveModel.findOne({ "leaves._id": leaveId });
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    leave.leaves = leave.leaves.map((l) =>
      l._id.toString() === leaveId
        ? { ...l, status: "approved", approvedBy: userId }
        : l
    );
    await leave.save();
    res.status(200).json({ message: "Leave accepted successfully" });
  } catch (error) {
    console.error("Error approving leave:", error);
    res.status(500).json({ message: error.message });
  }
});

export const leaveStat = asyncHandler(async (req, res) => {
  const id = req.body.userId;
  // console.log(id === null);
  let userId = "";
  if (id === null) {
    userId = res.user.user.userId;
  } else {
    userId = id;
  }

  const currentYear = new Date().getFullYear().toString();
  try {
    const leaveStats = await LeaveModel.aggregate([
      { $unwind: "$leaves" },
      {
        $match: {
          "leaves.year": currentYear,
          userId: userId,
        },
      },
      {
        $group: {
          _id: {
            leave_type: "$leaves.leave_type",
            status: "$leaves.status",
          },
          total: {
            $sum: {
              $cond: [{ $ne: ["$leaves.half_day", "none"] }, 0.5, 1],
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.leave_type",
          approved: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "approved"] }, "$total", 0],
            },
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "pending"] }, "$total", 0],
            },
          },
          rejected: {
            $sum: {
              $cond: [{ $eq: ["$_id.status", "rejected"] }, "$total", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          leave_type: "$_id",
          approved: 1,
          pending: 1,
          rejected: 1,
        },
      },
    ]);
    res.status(200).json({ leaveStats: leaveStats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export const getAll = asyncHandler(async (req, res) => {
  try {
    const { userId } = res.user.user;
    const currentYear = new Date().getFullYear().toString();
    const data = await LeaveModel.aggregate([
      { $unwind: "$leaves" },
      {
        $match: {
          "leaves.status": "approved",
          "leaves.year": currentYear,
        },
      },
      {
        $addFields: {
          leaveCount: {
            $cond: [{ $ne: ["$leaves.half_day", "none"] }, 0.5, 1],
          },
        },
      },
      {
        $group: {
          _id: "$userId",
          annualUsedLeave: { $sum: "$leaveCount" },
          monthUsedLeave: {
            $sum: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: [
                        { $month: "$leaves.startDate" },
                        new Date().getMonth() + 1,
                      ],
                    }, // current month
                    { $eq: [{ $year: "$leaves.startDate" }, 2025] },
                  ],
                },
                "$leaveCount",
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "permenent_users",
          localField: "_id",
          foreignField: "userId",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $project: {
          _id: 0,
          employeeId: "$employee.userId",
          employeeName: "$employee.fullName",
          department: "$employee.corporateDetails.department",
          img: "$employee.attachments.employeeImage",
          annualUsedLeave: 1,
          monthUsedLeave: 1,
        },
      },
    ]);
    res.status(200).json({ data: data });
  } catch (e) {
    console.log(e);
  }
});

export const getLeaveData = asyncHandler(() => {
  try {
    console.log("clicked");
  } catch (e) {
    console.log(e);
  }
});
