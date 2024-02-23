import { Router } from "express";
const router = Router();

import usersController from "../controllers/users.controller.js";
import formatValidation from "../middlewares/format.validation.middleware.js";
import userSchema from "../schemas/user.validation.schema.js";
import tokenMiddleware from "../middlewares/token.validation.middleware.js";

//get all users
router.get("/", usersController.getAllUsers);

//get single user
// router.get(
//   "/:id",
//   tokenMiddleware.validateToken,
//   usersController.getSingleUser,
// );

//get single user using token
router.get(
  "/user",
  tokenMiddleware.validateToken,
  usersController.getSingleUserByToken,
);

//get friends
router.get(
  "/:id/friends",
  tokenMiddleware.validateToken,
  usersController.getAllFriends,
);

//create a new user
router.post(
  "/",
  formatValidation.createUserFormatValidation(userSchema.createUser),
  usersController.createUser,
);

//update user partially
router.patch("/:id", tokenMiddleware.validateToken, usersController.updateUser);

// delete user
router.delete(
  "/:id",
  tokenMiddleware.validateToken,
  usersController.deleteUser,
);

//add or remove friends
router.patch(
  "/:id/:friendId",
  tokenMiddleware.validateToken,
  usersController.addRemoveFriends,
);

export default router;
