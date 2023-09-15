import mongoose from "mongoose";

const MsgSchema = new mongoose.Schema(
  {
    SendId: {
      type: String,
    },
    receiverId: {
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
