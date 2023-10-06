import express from "express";
import { Redis } from "ioredis";

const publisher = Redis.createClient();
publisher.connect();

const app = express();

app.get("/", (req, res) => {
  const message = {
    msg: "Hi pub/sub",
  };
  publisher.publish("test", JSON.stringify(message));
  res.send("Event published ");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
