import express from "express";
import userRouter from "./routes/users.js";
import leaveRouter from "./routes/leave.js";
import salesRouter from "./routes/sales.js";
import groupRouter from "./routes/group.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import databaseConnection from "./config/connection.js";
import { logger } from "./middlewares/logger.js";
import corsOptions from "./config/corsOptions.js";
import { startAutoUnlock } from "./services/autoUnlocked.js";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export { io };

io.on("connect", (socket) => {
  console.log("Socket connected:", socket.id);

});

app.use(logger);
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("uploads"));

// app.use((req, res) => {
//   console.log(req.body);
// })
app.use("/api/v1/users", userRouter);
app.use("/api/v1/leave", leaveRouter);
app.use("/api/v1/sales", salesRouter);
// app.use("/api/v1/sales", (req, res) => {
//   console.log("checkkkk");
// });
app.use("/api/v1/groups", groupRouter);

app.use(notFound);
app.use(errorHandler);

startAutoUnlock();

server.listen(process.env.PORT, () => {
  databaseConnection();
  console.log("server is running " + process.env.PORT);
});










