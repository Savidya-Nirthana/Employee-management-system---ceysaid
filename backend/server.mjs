import express from "express";
import userRouter from "./routes/users.js";
import leaveRouter from "./routes/leave.js";
import salesRouter from "./routes/sales.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import databaseConnection from "./config/connection.js";
import { logger } from "./middlewares/logger.js";
// import corsOptions from "./config/corsOptions.js";
const server = express();

const corsOptions = {
  origin: 'http://localhost:5173',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};



server.use(logger);
server.use(cors(corsOptions));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(express.static("uploads"));

// server.use((req, res) => {
//   console.log(req.body);
// })
server.use("/api/v1/users", userRouter);
server.use("/api/v1/leave", leaveRouter);
server.use("/api/v1/sales", salesRouter);
server.get("/api/v1", (req, res) => {
  res
    .status(200)
    .json({ message: "testingkkk", environment: process.env.NODE_ENV });
});

server.use(notFound);
server.use(errorHandler);

server.listen(process.env.PORT, () => {
  databaseConnection();
  console.log("server is running " + process.env.PORT);
});
