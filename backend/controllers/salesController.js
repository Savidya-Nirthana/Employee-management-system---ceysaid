import asyncHandler from "express-async-handler";
import SalesModel from "../models/sales.model.js";

export const addSales = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const sale = await SalesModel.create(req.body);
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


