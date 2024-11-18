const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const profilePictureStorage = multer.diskStorage({
  destination: path.join(__dirname, "public", "uploads", "profilePicture"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: profilePictureStorage });

app.post("/upload", upload.single("profilePicture"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.send({ filePath: `/uploads/profilePicture/${req.file.filename}` });
});

app.use(
  "/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
