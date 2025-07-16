import asyncHandler from "express-async-handler";
import GroupTours from "../models/groupTour.model.js";
import { uploadGroupContentMid } from "../middlewares/uploadGroupContentMiddleware.js";

export const saveData = asyncHandler(async (req, res) => {
  console.log(req.body);
  const formData = await req.body;
  try {
    const createTour = await GroupTours.create({
      userId: formData.userId,
      name: formData.groupTourName,
      country: formData.country,
      mainCities: formData.cities,
      total: formData.totalSeats,
      available: formData.availableSeats,
      flyer: formData.flyer,
      pdf: formData.pdf,
    });
    res
      .status(200)
      .json({ message: `${formData.groupTourName} create successfully` });
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
    // res.status(500).json({ message: e });
  }
});

export const uploadGoupContent = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }
    const buffer = req.file;
    const { userId, type } = req.body;
    const folder = `groups/${userId}/${type}`;
    const result = await uploadGroupContentMid(buffer, folder);
    res.status(200).json({ path: result });
  } catch (e) {
    console.log(e);
  }
});

export const getData = asyncHandler(async (req, res) => {
  try {
    const response = await GroupTours.find();
    return res.status(200).json({ data: response });
  } catch (e) {
    console.log(e);
  }
});
