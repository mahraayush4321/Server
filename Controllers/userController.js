import userModal from "../Models/UserModal.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncErrorhandler.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await userModal.findById(id);

  if (user) {
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } else {
    res.status(404).json("No such user exists");
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { currentUserId, password } = req.body;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }
  if (id === currentUserId) {
    const user = await userModal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "ok", msg: user });
  } else {
    res.status(403).json("access denied");
  }
});
export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    await userModal.findByIdAndDelete(id);
    res.status(200).json({ status: "ok", msg: "user removed successfully " });
  } else {
    res.status(403).json("you can only delete your own id");
  }
});
