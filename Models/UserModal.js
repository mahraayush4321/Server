import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import { required } from "nodemon/lib/config";

const userSchema = new userSchema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    followers: [],
    following: [],
  },
  { Timestamp: true }
);

const userModal = mongoose.model("Users", userSchema);

export default userModal;
