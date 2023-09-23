import { Server } from "socket.io";
import { createClient } from "redis";

export function initSocket(server) {
  const io = new Server(server);
  const client = createClient();

  client.on("error", (err) => {
    console.log("redis client error", err);
  });

  io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); //io emit to all clients
      console.log(msg);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}
