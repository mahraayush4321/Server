import { Server } from "socket.io";

export function initSocket(server) {
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
  return io;
}
