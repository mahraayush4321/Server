import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { loadRoutes } from "./Routeload/load.js";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();

loadRoutes(app);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch(console.error);

export { app, server, io };
