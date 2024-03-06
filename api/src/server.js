import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { config } from "dotenv-esm";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
// import {upload} from "./file.upload.js"
import bearerToken from "express-bearer-token";

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import postRoutes from "./routes/posts.routes.js";

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bearerToken());

// Use Routes
app.use("/api/oauth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//get images
app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "public", "uploads", filename);

  if (fs.existsSync(filePath)) {
    const fileExt = path.extname(filename).toLowerCase();
    switch (fileExt) {
      case ".jpg":
      case ".jpeg":
        res.setHeader("Content-Type", "image/jpeg");
        break;
      case ".png":
        res.setHeader("Content-Type", "image/png");
        break;
      default:
        res.setHeader("Content-Type", "application/octet-stream");
    }
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/sociafy-app")
  .then(() => console.log("MongoDB Database Connected..."))
  .catch((err) => console.log(err));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
