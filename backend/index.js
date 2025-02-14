const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

const authRoutes = require("./Routes/auth");
const noteRoutes = require("./Routes/notes");

const app = express();
const PORT = 6969;

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection Successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Server Is Running");
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/files", express.static("files"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
