// Load environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import cors from "cors";
import admin from "firebase-admin";

// Initialize Firebase Admin SDK
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT, "utf8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});

const bucket = admin.storage().bucket();
const app = express();

app.use(cors());
app.use(express.json());

// Multer setup (store file in memory before upload)
const upload = multer({ storage: multer.memoryStorage() });

// In-memory array to track uploaded files (name, uploader, timestamp)
let uploadedFiles = [];

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.body.uploader) {
      return res.status(400).send("File or uploader missing");
    }

    const blob = bucket.file(`shared/${req.file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: req.file.mimetype },
    });

    blobStream.on("error", (err) => res.status(500).send(err));

    blobStream.on("finish", () => {
      // Track uploaded file info
      uploadedFiles.push({
        name: req.file.originalname,
        uploader: req.body.uploader,
        uploadedAt: new Date().toISOString(),
      });
      res.status(200).send("Upload successful!");
    });

    // Push file buffer to Firebase Storage
    blobStream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed");
  }
});

// Get list of all uploaded files
app.get("/files", (req, res) => {
  res.json(uploadedFiles);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

