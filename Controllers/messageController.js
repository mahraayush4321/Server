import MsgModel from "../Models/MessageModel.js";
import redis from "../redis/redis.js";
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

//used redis cache->

export const getMessage = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const cachedata = await redis.get(`chat:${chatId}`);
    if (cachedata) {
      console.log("cache hit for getting message", chatId);

      return res.status(200).json(JSON.parse(cachedata));
    }
    const result = await MsgModel.find({ chatId });
    await redis.setex(`chat:${chatId}`, 900, JSON.stringify(result));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
