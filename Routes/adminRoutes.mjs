import express from "express";
import {
  predefined,
  retriveAllUsers,
  retriveUserById,
} from "../Controllers/adminController.js";

const router = express.Router();
router.get("/", retriveAllUsers);
router.get("/:id", retriveUserById);
router.post("/predef", predefined);
export default router;
