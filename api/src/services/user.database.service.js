import userModel from "../models/user.model.js";
import { hashPassword } from "../services/password.service.js";

const createUser = async (userDetails) => {
  const hashedPassword = await hashPassword(userDetails.password);
  const user = new userModel({ ...userDetails, password: hashedPassword });
  return await user.save();
};

const findUserByEmail = async (email) => {
  return userModel.findOne({ email: email }).exec();
};

export default { createUser, findUserByEmail };
