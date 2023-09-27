import userModal from "../Models/UserModal.js";
import redis from "../redis/redis.js";
import { asyncHandler } from "../utils/asyncErrorhandler.js";
export const retriveAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const cachedata = await redis.get("allUsers"); //using it as a key
    if (cachedata) {
      console.log("Cache hit!");
      return res.status(200).json(JSON.parse(cachedata));
    }
    const users = await userModal.find();
    await redis.setex("allUsers", 900, JSON.stringify(users));
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export const retriveUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const cacheuserId = await redis.get(`user:${userId}`);
    if (cacheuserId) {
      console.log("cache hit for single user ->", userId);
      return res.status(200).json(JSON.parse(cacheuserId));
    }
    const user = await userModal.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await redis.setex(`user:${userId}`, 900, JSON.stringify(user));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
