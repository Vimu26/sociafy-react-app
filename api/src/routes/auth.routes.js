// Import express
import { Router } from "express";

// Import middleware and controller
import { upload } from "../file.upload.js";
import authController from "../controllers/auth.controller.js";

// Create an instance of Express Router
const router = Router();

router.post("/register", upload.single("picture"), authController.register);

export default router;