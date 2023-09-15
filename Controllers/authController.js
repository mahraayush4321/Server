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

//login

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModal.findOne({ username: username });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      valid ? res.status(200).json(user) : res.status(400).json("Wrong pass");
    } else {
      res.status(404).json("user doesn't exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
