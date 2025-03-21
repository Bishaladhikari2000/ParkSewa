const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const ParkingSpot = require("../models/ParkingSpot");
const { auth, isAdmin } = require("../middleware/auth");

// Create parking spot (Admin only)
router.post(
  "/",
  [
    auth,
    isAdmin,
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("coordinates")
      .isArray()
      .withMessage("Coordinates must be an array of [longitude, latitude]"),
    body("totalSpots")
      .isInt({ min: 1 })
      .withMessage("Total spots must be at least 1"),
    body("pricePerHour")
      .isFloat({ min: 0 })
      .withMessage("Price per hour must be a positive number"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const parkingSpot = new ParkingSpot({
        ...req.body,
        availableSpots: req.body.totalSpots,
        owner: req.user._id,
      });

      await parkingSpot.save();
      res.status(201).json(parkingSpot);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get all parking spots
router.get("/", async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    // If coordinates are provided, search by location
    if (lat && lng) {
      const spots = await ParkingSpot.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: parseInt(radius) || 5000, // Default 5km radius
          },
        },
      });
      return res.json(spots);
    }

    // Otherwise return all spots
    const spots = await ParkingSpot.find();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get parking spot by ID
router.get("/:id", async (req, res) => {
  try {
    const spot = await ParkingSpot.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ message: "Parking spot not found" });
    }
    res.json(spot);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update parking spot (Admin only)
router.patch("/:id", [auth, isAdmin], async (req, res) => {
  try {
    const spot = await ParkingSpot.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!spot) {
      return res.status(404).json({ message: "Parking spot not found" });
    }

    res.json(spot);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete parking spot (Admin only)
router.delete("/:id", [auth, isAdmin], async (req, res) => {
  try {
    const spot = await ParkingSpot.findByIdAndDelete(req.params.id);
    if (!spot) {
      return res.status(404).json({ message: "Parking spot not found" });
    }
    res.json({ message: "Parking spot deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
