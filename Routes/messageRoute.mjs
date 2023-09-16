import express from "express";
import { addMessage } from "../Controllers/messageController.js";

const router = express.Router();

router.post("/", addMessage);

export default router;
