import asyncHandler from "express-async-handler";
import SalesModel from "../models/sales.model.js";

export const getAddProfit = asyncHandler(async (req, res) => {
  try {
    const result = await SalesModel.aggregate([
      {
        $group: {
          _id: { userId: "$userId", status: "$status" },
          count: { $sum: 1 },
        },
      },

      {
        $group: {
          _id: "$_id.userId",
          statuses: {
            $push: {
              status: "$_id.status",
              count: "$count",
            },
          },
        },
      },

      {
        $lookup: {
          from: "permenent_users",
          localField: "_id",
          foreignField: "userId",
          as: "user",
        },
      },

      {
        $project: {
          _id: 0,
          userId: "$_id",
          fullName: { $arrayElemAt: ["$user.fullName", 0] },
          statuses: 1,
        },
      },
    ]);

    res.status(200).json({ data: result });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
});
