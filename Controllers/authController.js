import userModal from "../Models/UserModal.js";

export const registerUser = async (req, res) => {
  const { userName, password, firstName, lastName } = req.body;

  const newUser = new userModal({ userName, password, firstName, lastName });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
