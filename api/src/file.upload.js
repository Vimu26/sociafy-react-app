import { fileURLToPath } from "url";
import { dirname, join } from "path";
import express from "express";
import path from "path";
import multer from "multer";
import Grid from "gridfs-stream";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/sociafy-app");

// Create a connection to the MongoDB database
const db = mongoose.connection;

// Initialize gridfs-stream with the correct arguments
Grid.mongo = mongoose.mongo;

// Pass the mongo object from Mongoose
const gfs = Grid(db, mongoose.mongo);

// Configure multer with disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "public", "uploads");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration
export const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const { originalname, mimetype } = req.file;

    // Create a write stream to GridFS
    const writeStream = gfs.createWriteStream({
      filename: originalname,
      mode: "w",
      content_type: mimetype,
    });

    // Write the file buffer to GridFS
    writeStream.write(req.file.buffer);
    writeStream.end();

    // Handle the finish event
    writeStream.on("finish", () => {
      // Return the filename of the uploaded file
      res.status(200).json({
        message: "File uploaded successfully!",
        filename: originalname,
      });
    });

    // Handle the error event
    writeStream.on("error", (error) => {
      console.error("Error handling file upload:", error);
      res.status(500).json({ message: "Internal Server Error" });
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});