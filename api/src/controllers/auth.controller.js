import userService from '../services/user.database.service.js';

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      status: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    if (!error.code == 11000) {
      console.error("An error occurred", error.message);
      return res.status(500).json({ status: false, message: error.message });
    }
    res.status(409).json({
      status: false,
      message: "An error occurred Because of Duplicate Creation",
      error: error.message,
    });
  }
};

export default { createUser };