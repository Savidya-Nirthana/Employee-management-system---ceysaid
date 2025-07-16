import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGC3BuBN4DAVNiA_10r_fMnjE6et0_bwU",
  authDomain: "ceysaid-file-server.firebaseapp.com",
  projectId: "ceysaid-file-server",
  storageBucket: "ceysaid-file-server.firebasestorage.app",
  messagingSenderId: "360043832475",
  appId: "1:360043832475:web:e806d562bff6c0b828923e",
  measurementId: "G-ZMHZCWL7TK",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };