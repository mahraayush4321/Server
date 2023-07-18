import userModal from "../Models/UserModal.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(password, salt);

  const newUser = new userModal({
    username,
    password: hashpass,
    firstName,
    lastName,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
