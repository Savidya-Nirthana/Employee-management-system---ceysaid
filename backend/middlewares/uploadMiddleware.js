import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { email, type } = req.body;

      const uploadDir = `uploads/${email}/${type}`;
      fs.mkdir(uploadDir, { recursive: true }, (err) => {
        if (err) return cb(err);
        cb(null, uploadDir);
      });
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
    
  });
export const upload = multer({ storage });

