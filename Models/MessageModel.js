import mongoose from "mongoose";

const MsgSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const MsgModel = mongoose.Model("Messages", MsgSchema);
export default MsgModel;
