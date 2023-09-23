import userModal from "../Models/UserModal.js";
import { asyncHandler } from "../utils/asyncErrorhandler.js";
import predefinedMessages from "../predefinedmsgs.js";
export const retriveAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await userModal.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export const retriveUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await userModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const predefined = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message content is required" });
    }
    const newMessage = {
      id: predefinedMessages.length + 1,
      message,
    };
    predefinedMessages.push(newMessage);
    io.emit("new-predefined-message", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating predefined message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
