import express from "express";
import userRouter from "./routes/users.js";
import leaveRouter from "./routes/leave.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import databaseConnection from "./config/connection.js";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "http://192.168.236.24:5173",
    credentials: true,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.static("uploads"));

// server.use((req, res) => {
//   console.log(req.body);
// })

server.use("/api/v1/users", userRouter);
server.use("/api/v1/leave", leaveRouter);
server.get("/api/v1", (req, res) => {
  res
    .status(200)
    .json({ message: "testing", environment: process.env.NODE_ENV });
});

server.use(notFound);
server.use(errorHandler);

server.listen(process.env.PORT, () => {
  databaseConnection();
  console.log("server is running " + process.env.PORT);
});
