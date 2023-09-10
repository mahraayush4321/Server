import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { loadRoutes } from "./Routeload/load.js";

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();

loadRoutes(app);

app.get("/electronic/:id0?/:id1?", (req, res) => {
  if (req.params.id0 == undefined) {
    res.send("Electronics");
  } else if (req.params.id1 == undefined) {
    res.send(req.params.id0);
  } else {
    res.send(req.params.id1);
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
    app.listen(process.env.PORT, () => {
      console.log(`listening to port ${process.env.PORT}`);
    });
  })
  .catch(console.error);
