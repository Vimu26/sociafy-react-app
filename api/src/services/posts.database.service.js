import postsModel from "../models/posts.model.js";
import PostModel from "../models/posts.model.js";

const getAllPosts = async (query) => {
  return await PostModel.find(query).populate("user");
};

const getPostOfUser = async (id) => {
  return await PostModel.findById(id).populate("user");
};

const createPost = async (PostDetails) => {
  const Post = new PostModel({ ...PostDetails });
  return await Post.save();
};

const updatePost = async (id, PostDetails) => {
  if (PostDetails.comments) {
    const post = await PostModel.findById(id);
    post.comments.push(PostDetails.comments);
    return await PostModel.findByIdAndUpdate(id, post, {
      new: true,
    });
  }
  return await PostModel.findByIdAndUpdate(id, PostDetails, {
    new: true,
  });
};

const likePost = async (id, userId) => {
  console.log(userId);
  const post = await postsModel.findById(id);
  if (!post.likes) {
    post.likes = new Map();
  }
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
