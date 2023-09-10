import express from "express";
import bodyparser from "body-parser";
import dotenv from "dotenv";
import { loadRoutes } from "./Routeload/load.js";

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));

dotenv.config();

loadRoutes(app);

export default app;
