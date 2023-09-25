import userModal from "../Models/UserModal.js";
import { asyncHandler } from "../utils/asyncErrorhandler.js";
export const retriveAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await userModal.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export const retriveUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await userModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
