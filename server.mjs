import { server } from "./app.js";

server.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
  console.log("received signal to shutdown");
  server.close(() => {
    console.log("closing");
    process.exit(0);
  });
}
