import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import { readdirSync } from "fs";
import dotenv from "dotenv";

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

readdirSync("./Routes").forEach((file) => {
  if (file.endsWith(".mjs")) {
    const routeModule = import(`./Routes/${file}`);
    const routeName = file.replace(".mjs", "");
    routeModule
      .then((module) => {
        app.use(`/${routeName}`, module.default);
      })
      .catch((error) => {
        console.error(`Error loading route ${file}:`, error);
      });
  }
});

dotenv.config();

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
