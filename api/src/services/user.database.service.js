import userModel from '../models/user.model.js';

const createUser = async (userDetails) => {
  const user = new userModel(userDetails);
  return await user.save();
};

export default { createUser };