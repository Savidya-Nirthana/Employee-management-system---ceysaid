import asyncHandler from "express-async-handler";
import GroupTours from "../models/groupTour.model.js";
import { uploadGroupContentMid } from "../middlewares/uploadGroupContentMiddleware.js";

export const saveData = asyncHandler(async (req, res) => {
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

export const groupDelete = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  try {
    await GroupTours.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Group tour deleted successfully" });
  } catch (e) {
    console.log(e);
  }
});

export const participantDocUpload = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }
    const buffer = req.file;
    const { groupId, participantName } = req.body;
    const folder = `groups/${groupId}/participants/${participantName}`;

    const result = await uploadGroupContentMid(buffer, folder);
    res.status(200).json({ path: result });
  } catch (e) {
    console.log(e);
  }
});

export const addParticipant = asyncHandler(async (req, res) => {
  const {
    groupId,
    fullName,
    contactNo,
    payment,
    airTicket,
    visa,
    foods,
    remarks,
    uploadedFiles,
  } = req.body;
  try {
    const { userId } = res.user.user;
    const groupTour = await GroupTours.findById(groupId);
    console.log(userId);
    if (!groupTour) {
      return res.status(404).json({ message: "Group tour not found" });
    }

    const newParticipant = {
      userId,
      fullName,
      contactNo,
      payment,
      airTicket,
      visa,
      foods,
      remarks,
      uploadedFiles,
    };
    console.log(newParticipant);

    groupTour.participants.push(newParticipant);
    groupTour.available -= 1;
    await groupTour.save();
    res.status(201).json({ message: "Participant added successfully" });
  } catch (e) {
    console.log(e);
  }
});

export const getParticipants = asyncHandler(async (req, res) => {
  const { groupId } = req.body;

  try {
    const groupTour = await GroupTours.findById(groupId);
    if (!groupTour) {
      return res.status(404).json({ message: "Group tour not found" });
    }
    return res.status(200).json({ data: groupTour.participants });
  } catch (e) {
    console.log(e);
  }
});
