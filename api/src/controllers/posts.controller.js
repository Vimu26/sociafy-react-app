import PostsService from "../services/posts.database.service.js";

const getAllPosts = async (req, res) => {
  console.log(req.query);
  const { userId } = req.query;
  let query = {};
  if (userId) {
    query = { user: userId };
  }
  try {
    const Posts = await PostsService.getAllPosts(query);
    res.status(200).json({
      status: true,
      message: "Posts Found Successfully",
      data: Posts,
    });
  } catch (err) {
    console.error("An error occurred", err.message);
    res.status(404).json({ status: false, message: err.message });
  }
};

const getAllPostsOfUser = async (req, res) => {
  try {
    const Posts = await PostsService.getPostOfUser(req.params.id);
    res.status(200).json({
      status: true,
      message: "Posts Found Successfully",
      data: Posts,
    });
  } catch (err) {
    console.error("An error occurred", err.message);
    res.status(404).json({ status: false, message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture_path = req.file.filename;
    }
    const Post = await PostsService.createPost(req.body);
    res.status(201).json({
      status: true,
      message: "Post Created Successfully",
      data: Post,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const Post = await PostsService.updatePost(req.params.id, req.body);
    console.log(Post)
    res.status(200).json({
      status: true,
      message: "Post Updated Successfully",
      data: Post,
    });
  } catch (error) {
    console.error("An error occurred", error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const likePost = async (req, res) => {
  const id = req.params.id;
  console.log(req.body)
  const userId = req.body.user;
  try {
    const Post = await PostsService.likePost(id, userId);
    res.status(200).json({
      status: true,
      message: "Post Liked Successfully",
      data: Post,
    });
  } catch (error) {
    console.error("An error occurred", error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletePost = await PostsService.deletePost(req.params.id);
    res.status(200).json({
      status: true,
      message: "Post Deleted Successfully",
      data: deletePost,
    });
  } catch (err) {
    console.error("An error occurred", err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

export default {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
  getAllPostsOfUser,
  likePost,
};
