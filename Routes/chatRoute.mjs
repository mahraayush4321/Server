import express from "express";
import { createChats } from "../Controllers/chatController.js";
import apiResponse from "../middleware/apiResponse.js";

const router = express.Router();

router.use(apiResponse);

router.post("/", createChats);

export default router;
