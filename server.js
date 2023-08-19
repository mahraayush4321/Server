import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import Auth from "./Routes/Auth.js";
import UserRoute from "./Routes/userRoute.js";
import dotenv from "dotenv";

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();

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

app.use("/auth", Auth);
app.use("/user", UserRoute);
