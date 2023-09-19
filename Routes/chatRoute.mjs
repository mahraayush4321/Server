import express from "express";
import { createChats } from "../Controllers/chatController.js";

const router = express.Router();

router.post("/", createChats);

export default router;
