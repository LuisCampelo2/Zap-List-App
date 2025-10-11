import User from "../models/user.js"

const infoUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}

export const userControllers = {
  infoUser
}