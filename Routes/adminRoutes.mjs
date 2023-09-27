import express from "express";
import {
  retriveAllUsers,
  retriveUserById,
} from "../Controllers/adminController.js";

const router = express.Router();
router.get("/", retriveAllUsers);
router.get("/:id", retriveUserById);

export default router;
