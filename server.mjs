import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import { readdir } from "fs/promises";
import dotenv from "dotenv";

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

async function loadRoutes() {
  try {
    const routeFiles = await readdir("./Routes");

    for (const file of routeFiles) {
      if (file.endsWith(".mjs")) {
        const routeModule = await import(`./Routes/${file}`);
        const routeName = file.replace(".mjs", "");
        app.use(`/${routeName}`, routeModule.default);
        console.log(`Route loaded: /${routeName}`);
      }
    }
  } catch (error) {
    console.error("Error loading routes:", error);
  }
}

loadRoutes();

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
