import userModal from "../Models/UserModal.js";

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

export const updateUser=async(req,res)=>{
    const id=req.params.id;

    const{currentUserId,currentUserAdmin,password}=req.body;

    
}
