const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

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
    type: addressSchema,
    require: true,
  },
  destination: {
    type: addressSchema,
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
  },
  duration: {
    type: Number,
  }, // in seconds
  distance: {
    type: Number,
  }, // in meters
  fare: {
    car: {
      type: Number,
      required: true,
    },
    auto: {
      type: Number,
      required: true,
    },
    moto: {
      type: Number,
      required: true,
    },
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
