import chatModel from "../Models/chatModel.js";

export const createChats = async (req, res) => {
  const newChat = new chatModel({
    users: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
