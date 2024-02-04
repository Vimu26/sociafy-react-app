// Import express
import { Router } from "express";

// Import middleware and controller
import { upload } from "../file.upload.js";
import userController from "../controllers/auth.controller.js";
import formatValidation from "../middlewares/format.validation.middleware.js";
import userSchema from "../schemas/user.validation.schema.js";

// Create an instance of Express Router
const router = Router();

router.post(
  "/register",
  formatValidation.createUserFormatValidation(userSchema.createUser),
  upload.single("picture"),
  userController.createUser,
);
router.post(
  "/login",
  formatValidation.userLoginFormatValidation(userSchema.loginUser),
  userController.loginUser,
);

export default router;
