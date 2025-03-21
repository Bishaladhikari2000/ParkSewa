const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  totalSpots: {
    type: Number,
    required: true,
    min: 1,
  },
  availableSpots: {
    type: Number,
    required: true,
    min: 0,
  },
  pricePerHour: {
    type: Number,
    required: true,
    min: 0,
  },
  features: [
    {
      type: String,
      enum: ["covered", "security", "charging", "disabled"],
    },
  ],
  status: {
    type: String,
    enum: ["active", "maintenance", "closed"],
    default: "active",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for geospatial queries
parkingSpotSchema.index({ location: "2dsphere" });

const ParkingSpot = mongoose.model("ParkingSpot", parkingSpotSchema);
module.exports = ParkingSpot;
