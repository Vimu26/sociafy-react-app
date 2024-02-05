import postsModel from "../models/posts.model.js";
import PostModel from "../models/posts.model.js";

const getAllPosts = async () => {
  return await PostModel.find().populate("user");
};

const getPostOfUser = async (id) => {
  return await PostModel.findById(id).populate("user");
};

const createPost = async (PostDetails) => {
  const Post = new PostModel({ ...PostDetails });
  return await Post.save();
};

const updatePost = async (id, PostDetails) => {
  return await PostModel.findByIdAndUpdate(id, PostDetails, {
    new: true,
  });
};

const likePost = async (id, userId) => {
  const post = await postsModel.findById(id);
  const isLiked = post.likes.get(userId);

  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  return await postsModel.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true },
  );
};

const deletePost = async (id) => {
  return PostModel.findByIdAndDelete(id);
};

export default {
  getAllPosts,
  getPostOfUser,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
