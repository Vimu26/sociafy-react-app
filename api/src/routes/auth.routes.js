// Import express
import express from "express";

// Import middleware and controller
import upload from "../index.js";
import authController from "../controllers/auth.controller.js";

// Create an instance of Express Router
const router = express.Router();

// Define a route with middleware and controller
router.post("/register", upload.single("picture"), authController.register);

// Export the router
export default router;
