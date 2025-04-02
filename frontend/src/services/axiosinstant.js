import axios from "axios";

const API = axios.create({
  baseURL: `https://employee-management-system-ceysaid.vercel.app`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
