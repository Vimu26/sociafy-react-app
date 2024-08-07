import userModel from "../models/user.model.js";
import { hashPassword } from "../services/password.service.js";

const getAllUsers = async () => {
  return await userModel.find();
};

const getSingleUser = async (id) => {
  return await userModel.findById(id);
};

const getAllFriends = async (id) => {
  const user = await userModel.findById(id);
  const friendPromises = user.friends.map(async (friendId) => {
    return await userModel.findById(friendId);
  });

  const friends = await Promise.all(friendPromises);

  return friends;
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
    new: true,
  });
};

const addRemoveFriends = async (userId, friendId) => {
  console.log(userId + " and " + friendId);
  const user = await userModel.findById(userId);
  const friend = await userModel.findById(friendId);

  if (user.friends.includes(friendId) && friend.friends.includes(userId)) {
    // User is removing the friend
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== userId);
  } else {
    // User is adding the friend
    user.friends.push(friendId);
    friend.friends.push(userId);
  }
  console.log(user.friends);
  console.log(friend.friends);
  // Save changes to both user and friend
  await Promise.all([user.save(), friend.save()]);

  // Retrieve updated friends list for the user
  const updatedUser = await userModel.findById(userId);
  const friends = await Promise.all(
    updatedUser.friends.map((id) => userModel.findById(id)),
  );

  return friends;
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
  deleteUser,
  getAllFriends,
  addRemoveFriends,
};
