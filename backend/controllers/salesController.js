import asyncHandler from "express-async-handler";
import SalesModel from "../models/sales.model.js";

export const addSales = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const userId = res.user.user.userId;
    console.log(res.user);
    console.log(req.body);
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
      urgent: data.urgent === "Yes" ? true : false,
    });
    res.json(sale).status(200);
  } catch (err) {
    console.error(err);
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
