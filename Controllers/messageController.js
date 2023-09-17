import MsgModel from "../Models/MessageModel.js";

export const addMessage = async (req, res) => {
  const { senderId, receiverId, text } = req.body;
  const message = new MsgModel({
    senderId,
    receiverId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
