import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

mongoose
  .connect(
    "mongodb+srv://tanishqmahra:Aizen12345@cluster0.uwncpoa.mongodb.net/socialMedia?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("listening");
    });
  });
