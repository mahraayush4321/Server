import chatModel from "../Models/chatModel.js";
import apiResponse from "../middleware/apiResponse.js";
export const createChats = async (req, res) => {
  const newChat = new chatModel({
    users: [req.body.senderId, req.body.receiverId],
  });
  try {
    const data = await newChat.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
