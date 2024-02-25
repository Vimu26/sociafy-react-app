import { Router } from "express";
import { upload } from "../file.upload.js";
const router = Router();

import postsController from "../controllers/posts.controller.js";
import formatValidation from "../middlewares/format.validation.middleware.js";
import postsSchema from "../schemas/posts.validation.schema.js";
import tokenMiddleware from "../middlewares/token.validation.middleware.js";

//get all Posts
router.get("/", tokenMiddleware.validateToken, postsController.getAllPosts);

//get a post Posts
router.get(
  "/:id",
  tokenMiddleware.validateToken,
  postsController.getAllPostsOfUser,
);

//create a post
router.post(
  "/",
  tokenMiddleware.validateToken,
  upload.single("picture"),
  formatValidation.createPostFormatValidation(postsSchema.createPost),
  postsController.createPost,
);

//update Post partially
router.patch("/:id", tokenMiddleware.validateToken, postsController.updatePost);

// like post
router.patch(
  "/:id/like",
  tokenMiddleware.validateToken,
  postsController.likePost,
);

// delete Post
router.delete(
  "/:id",
  tokenMiddleware.validateToken,
  postsController.deletePost,
);

// //add or remove friends
// router.patch("/:id/:friendId", PostsController.addRemoveFriends);

export default router;
