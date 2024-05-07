import postsModel from "../models/posts.model.js";

const getAllPosts = async (query) => {
  return await postsModel.find(query).populate("user");
};

const getPostOfUser = async (id) => {
  return await postsModel.findById(id).populate("user");
};

const createPost = async (PostDetails) => {
  const Post = new postsModel({ ...PostDetails });
  return await Post.save();
};

const updatePost = async (id, PostDetails) => {
  if (PostDetails.comments) {
    const post = await postsModel.findById(id);
    post.comments.push(PostDetails.comments);
    return await postsModel.findByIdAndUpdate(id, post, {
      new: true,
    });
  }
  return await postsModel.findByIdAndUpdate(id, PostDetails, {
    new: true,
  });
};

const likePost = async (id, userId) => {
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
  return postsModel.findByIdAndDelete(id);
};

export default {
  getAllPosts,
  getPostOfUser,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
