import chatModel from "../Models/chatModel.js";
import { asyncHandler } from "../utils/asyncErrorhandler.js";

export const createChats = asyncHandler(async (req, res, next) => {
  const newChat = new chatModel({
    users: [req.body.senderId, req.body.receiverId],
  });
  const data = await newChat.save();
  res.status(200).json(data);
});
