const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  origin: {
    type: String,
    require: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "on going", "completed", "cancelled"],
    default: "pending",
  },
  vehicle: {
    type: String,
    enum: ["car", "bike", "truck"],
    required: true,
  },
  duration: {
    type: Number,
  }, // in seconds
  distance: {
    type: Number,
  }, // in meters
  fare: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
});

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;
