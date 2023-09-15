import mongoose from "mongoose";

const MsgSchema = new mongoose.Schema(
  {
    SendId: {
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
const MsgModel = mongoose.Model("Msgs", MsgSchema);
export default MsgModel;
