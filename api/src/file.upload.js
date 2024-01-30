import multer from "multer";
import path from "path";

// Create an instance of multer with the storage destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Initialize multer with the storage configuration
export const upload = multer({ storage: storage });

// Example route handler for file upload
export const handleFileUpload = (req, res) => {
  // Logic to handle file upload
  // You can access the uploaded file using req.file
  res.status(200).json({ message: "File uploaded successfully!" });
};
