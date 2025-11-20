  import express from "express";
  import { protect } from "../middlewares/authMiddleware.js";
  import {
    addParticipant,
    getData,
    getParticipants,
    groupDelete,
    participantDocUpload,
    saveData,
    uploadGoupContent,
  } from "../controllers/groupController.js";
  import multer from "multer";

  const router = express.Router();
  const upload = multer();

  router.post("/saveData", protect, saveData);
  router.post("/upload", protect, upload.single("file"), uploadGoupContent);
  router.get("/getData", protect, getData);
  router.post("/delete", protect, groupDelete);
  router.post(
    "/uploadParticipantDoc",
    protect,
    upload.single("file"),
    participantDocUpload
  );
  router.post("/addParticipant", protect, addParticipant);
  router.post("/getParticipants", protect ,getParticipants);
  export default router;



