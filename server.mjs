import { app } from "./app.js";
import http from "http";
import { initSocket } from "./socket/socket.js";

const httpServer = http.createServer(app);
const io = initSocket(httpServer);

httpServer.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
  console.log("received signal to shutdown");
  httpServer.close(() => {
    console.log("closing");
    process.exit(0);
  });
}
