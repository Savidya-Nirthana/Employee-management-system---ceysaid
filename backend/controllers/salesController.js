import asyncHandler from "express-async-handler";
import SalesModel from "../models/sales.model.js";
import { io } from "../server.mjs";
import { uploadSalesContentMid } from "../middlewares/uploadSalesContentMid.js";

export const addSales = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const userId = res.user.user.userId;
    const sale = await SalesModel.create({
      userId: userId,
      subject: data.subject,
      country: data.country,
      mainCities: data.cities,
      no_pax: {
        adult: data.adults,
        child: data.children,
        infant: data.infants,
      },
      noDays: data.numofdays,
      startDate: data.travelStartDate,
      additionalInfo: data.additionalDetails,
      customerDetails: {
        name: data.customername,
        contactMethod: data.contactMethod,
        contactDetails: data.contactValue,
        lead: data.lead,
      },
      status: "pending",
      priority: data.priority,
    });
    res.status(200).json({ message: "Add sales successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export const getDataById = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.query;
    const data = await SalesModel.find({ userId: userId });
    if (data.length > 0) {
      return res
        .json({ data: data, isEmpty: false, isError: false })
        .status(200);
    } else {
      return res.json({ data: "Empty", isEmpty: true, isError: false });
    }
  } catch (err) {
    return res.json({ data: "Error", isError: true, error: e });
  }
});

export const getAllData = asyncHandler(async (req, res) => {
  try {
    const data = await SalesModel.find({ status: "pending" });
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export const opData = asyncHandler(async (req, res) => {
  try {
    // console.log("checked");
    const data = await req.body;
    const id = data.selectSale._id;
    const approvedId = res.user.user.userId;

    const newLog = {
      category: "acceptance",
      isText: true,
      flights: data.flightDetails,
      hotels: data.hotelDetails,
      itenary: data.itenaryDetails,
      package: data.packageDetails,
      special: data.specialDetails,
      attachements: [],
    };

    const reseponse = await SalesModel.findByIdAndUpdate(
      id,
      {
        $push: {
          "logs.acceptance": newLog,
        },
        $set: {
          status: "approved",
          approvedBy: approvedId,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Send Success", isError: false });
  } catch (e) {
    return res.status(500).json({ message: "Error", isError: true });
  }
});

export const uploadSalesContent = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }
    const buffer = req.file;
    const { subject } = req.body;
    const folder = `sales/${subject}`;
    const result = await uploadSalesContentMid(buffer, folder);
    res.status(200).json({ path: result });
  } catch (e) {
    console.log(e);
  }
});

export const uploadConfimation = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file recieved" });
    }

    const { subject } = req.body;
    const buffer = req.file;
    const folder = `sales/${subject}_confirmation`;

    const result = await uploadSalesContentMid(buffer, folder);

    res.status(200).json({ path: result });
  } catch (e) {
    console.log(e);
  }
});

export const saveFiles = asyncHandler(async (req, res) => {
  try {
    const id = req.body.selectSale._id;
    const urls = req.body.urls;
    const approvedId = res.user.user.userId;

    const newLog = {
      category: "acceptance",
      isText: false,
      flights: null,
      hotels: null,
      itenary: null,
      package: null,
      special: null,
      attachements: urls,
    };

    const reseponse = await SalesModel.findByIdAndUpdate(
      id,
      {
        $push: {
          "logs.acceptance": newLog,
        },
        $set: {
          status: "approved",
          approvedBy: approvedId,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Upload success", isError: false });
  } catch (error) {
    return res.status(500).json({ message: "Error", isError: true });
  }
});

export const approveData = asyncHandler(async (req, res) => {
  try {
    const userId = await req.query.userId;
    const response = await SalesModel.find({
      userId: userId,
      status: { $in: ["approved", "confirm"] },
    });
    if (response.length > 0) {
      return res.status(200).json({ isZero: false, data: response });
    } else {
      return res.status(200).json({ isZero: true, data: "Empty" });
      // console.log("sds");
    }
  } catch (err) {
    console.error(err);
  }
});

export const lockedControll = asyncHandler(async (req, res) => {
  try {
    io.emit("hidden");
    const { data, userId } = req.query;
    console.log(data);
    const reseponse = await SalesModel.findByIdAndUpdate(data, {
      $set: { isLocked: true, lockedBy: userId, lockedAt: new Date() },
    });
    res.status(200).json({ mssage: "locked" });
  } catch (e) {
    console.log(e);
  }
});

export const unlockedControll = asyncHandler(async (req, res) => {
  try {
    io.emit("hidden");
    const { data, userId } = req.query;
    const response = await SalesModel.findByIdAndUpdate(data, {
      $set: { isLocked: false, lockedBy: null, lockedAt: null },
    });
    res.status(200).json({ mssage: "unlocked" });
  } catch (e) {
    console.log(e);
  }
});

export const getApprovedData = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.query;
    const data = await SalesModel.find({
      status: "approved",
      approvedBy: userId,
    });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log("error");
  }
}); 

export const salesConfirmation = asyncHandler(async (req, res) => {
  try {
    const { saleId, urls } = req.query;
    const newLog = {
      category: "confirmation",
      attachements: urls,
    };

    const response = await SalesModel.findByIdAndUpdate(
      saleId,
      {
        $push: {
          "logs.confirmation": newLog,
        },
        $set: {
          status: "confirm",
        },
      },
      { new: true }
    );
    return res.status(200).json({ message: "Upload success", isError: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error", isError: true });
  }
});
