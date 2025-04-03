import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const { userId, type } = req.body;

//       const uploadDir = `uploads/${userId}/${type}`;
//       fs.mkdir(uploadDir, { recursive: true }, (err) => {
//         if (err) return cb(err);
//         cb(null, uploadDir);
//       });
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },

//   });
// export const upload = multer({ storage });
