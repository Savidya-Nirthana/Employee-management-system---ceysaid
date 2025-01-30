import express from "express";

const server = express();

server.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "testing", environment: process.env.NODE_ENV });
});

server.listen(process.env.PORT, () => {
  console.log("server is running " + process.env.PORT);
});
