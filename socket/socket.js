import { Server } from "socket.io";

export function initSocket(server) {
  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log("User connected");
    console.log(socket.id);
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); //io emit to all clients
      console.log(msg);
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}
