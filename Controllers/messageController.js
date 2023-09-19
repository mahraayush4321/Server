import MsgModel from "../Models/MessageModel.js";
import { asyncHandler } from "../utils/asyncErrorhandler.js";

export const addMessage = asyncHandler(async (req, res, next) => {
  const { chatId, senderId, text } = req.body;
  try {
    const message = new MsgModel({
      chatId,
      senderId,
      text,
    });
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MsgModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
