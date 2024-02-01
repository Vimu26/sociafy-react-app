// Import express
import { Router } from "express";

// Import middleware and controller
import { upload } from "../file.upload.js";
import userController from "../controllers/auth.controller.js";
import  createUserFormatValidation  from "../middlewares/format.validation.middleware.js";
import  createUser  from "../schemas/user.validation.schema.js";

// Create an instance of Express Router
const router = Router();

router.post(
  "/register",
  createUserFormatValidation.createUserFormatValidation(createUser.createUser),
  upload.single("picture"),
  userController.createUser
);

export default router;
