import userModal from "../Models/UserModal";

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModal.findById(id);

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
