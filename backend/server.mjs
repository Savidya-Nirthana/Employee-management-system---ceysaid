import express from "express";
import userRouter from "./routes/users.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

server.use(express.json());
server.use(cookieParser());

server.get("/api/v1", (req, res) => {
  res
    .status(200)
    .json({ message: "testing", environment: process.env.NODE_ENV });
});

server.use("/api/v1/users", userRouter);

server.use(notFound);
server.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log("server is running " + process.env.PORT);
});
