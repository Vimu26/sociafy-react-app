import userModel from "../models/user.model.js";
import { hashPassword } from "../services/password.service.js";

const getAllUsers = async () => {
  return await userModel.find();
};

const getSingleUser = async (id) => {
  return await userModel.findById(id);
};

// Add a new User to the database
const createUser = async (userDetails) => {
  const hashedPassword = await hashPassword(userDetails.password);
  const user = new userModel({ ...userDetails, password: hashedPassword });
  return await user.save();
};

const findUserByEmail = async (email) => {
  return userModel.findOne({ email: email }).exec();
};

const updateUser = async (id, userDetails) => {
  if (userDetails.password !== undefined) {
    userDetails.password = await hashPassword(userDetails.password);
  }
  return await userModel.findByIdAndUpdate(id, userDetails, {
    new: true
  });
};

const deleteUser = async (id) => {
  return userModel.findByIdAndDelete(id);
};

export default {
  createUser,
  findUserByEmail,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
