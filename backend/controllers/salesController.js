import asyncHandler from "express-async-handler";
import SalesModel from "../models/sales.model.js";

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
        lead: "YouTube Ads",
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
    res.json({ data: data }).status(200);
  } catch (err) {
    console.error(err);
  }
});

export const getAllData = asyncHandler(async (req, res) => {
  try {
    const data = await SalesModel.find({});
    res.status(200).json({ data: data });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});
