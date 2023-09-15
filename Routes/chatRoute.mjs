import express from "express";

const router = express.Router();

router.post("/", sendChats);
router.get("/:userId", userChat);
