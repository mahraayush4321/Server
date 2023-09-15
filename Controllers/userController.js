import userModal from "../Models/UserModal.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModal.findById(id);

    if (user) {
      const { password, ...other } = user._doc;

      res.status(200).json(other);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, password } = req.body;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }

  if (id === currentUserId) {
    try {
      const user = await userModal.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {}
  } else {
    res.status(403).json("access denied");
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    try {
      await userModal.findByIdAndDelete(id);
      res.status(200).json("user removed successfully ");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can only delete your own id");
  }
};
