import { storage } from "../config/firebaseConfig.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export const uploadUserContentMid = (file, folder) =>
  new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${folder}/${file.originalname}`);
    const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
      contentType: file.mimetype,
    });
    uploadTask.on(
      "state_changed",
      (snap) => {
        const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log(`Upload ${pct.toFixed(0)} %`);
      },
      reject,
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });

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
