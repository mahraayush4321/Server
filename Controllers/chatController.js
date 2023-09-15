import chatModel from "../Models/chatModel.js";

export const createChats = async (req, res) => {
  const newChat = new chatModel({
    users: [req.body.senderId, req.body.receiverId],
  });
};
