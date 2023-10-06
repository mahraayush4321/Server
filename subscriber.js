import express from "express";
import { Redis } from "ioredis";

const subscriber = Redis.createClient();
subscriber.connect();

const app = express();

subscriber.subscribe("test", (message) => {
  console.log(message);
});

app.get("/", (req, res) => {
  res.send("Subscriber One");
});

app.listen(3001, () => {
  console.log("server is listening to port 3001");
});
