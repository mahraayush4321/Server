import { Server } from "socket.io";
export function initSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("User connected");

    const messages = ["Welcome to our support service", "how can we help you"];

    socket.emit("messageArray", messages);

    socket.on("chat message", (msg) => {
      io.emit("message", "hello welcome everyone");
      io.emit("chat message", msg); //io emit to all clients
      console.log(msg);
    });

    socket.on("help", (data) => {
      const helpMessages = [
        "Here are some ways we can help:",
        "get your invoice",
        "know about your orders",
      ];
      helpMessages.forEach((message) => {
        socket.emit("message", message);
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}
