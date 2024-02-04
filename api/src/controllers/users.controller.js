import userService from "../services/user.database.service.js";

const getAllUsers = async (req, res) => {
  try {
    const userDetails = await userService.getAllUsers();
    res.status(200).json({
      status: true,
      message: "Users Found Successfully",
      data: userDetails
    });
  } catch (err) {
    console.error("An error occurred", err.message);
    res.status(404).json({ status: false, message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await userService.getSingleUser(req.params.id);
    res
      .status(200)
      .json({ status: true, message: "User Found Successfully", data: user });
  } catch (err) {
    console.error("An error occurred", err.message);
    return res.status(500).json({ status: false, message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      status: true,
      message: "User Created Successfully",
      data: user
    });
  } catch (error) {
    if (!error.code == 11000) {
      console.error("An error occurred", error.message);
      return res.status(500).json({ status: false, message: error.message });
    }
    res.status(409).json({
      status: false,
      message: "An error occurred Because of Duplicate Creation",
      error: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      status: true,
      message: "User Updated Successfully",
      data: user
    });
  } catch (error) {
    if (!error.code == 11000) {
      console.error("An error occurred", error.message);
      return res.status(500).json({ status: false, message: error.message });
    }
    res.status(409).json({
      status: false,
      message: "An error occurred Because of Duplicate Creation",
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await userService.deleteUser(req.params.id);
    res.status(200).json({
      status: true,
      message: "User Deleted Successfully",
      data: deleteUser
    });
  } catch (err) {
    console.error("An error occurred", err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser
};
