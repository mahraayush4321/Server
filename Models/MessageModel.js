import mongoose from "mongoose";

const MsgSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const MsgModel = mongoose.model("Messages", MsgSchema);
export default MsgModel;
