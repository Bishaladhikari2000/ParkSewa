require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const initializeUsers = require("./utils/initUsers");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/parksewa";
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    initializeUsers();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
const authRoutes = require("./routes/auth");
const parkingSpotRoutes = require("./routes/parkingSpots");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/parking-spots", parkingSpotRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ParkSewa API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
