import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    users: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
const chatModel = mongoose.model("chats", chatSchema);
export default chatModel;
