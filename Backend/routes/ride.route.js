const router = require("express").Router();
const authMiddleware = require("../middleware/authUser.middleware");
const rideServices = require("../services/ride.services");
const { body } = require("express-validator");
const rideController = require("../controllers/ride.controller");

//function to find sum of all the numbers array
router.post(
  "/create",
  authMiddleware.authUser,
  [
    body("originCoordinates").notEmpty().withMessage("origin is required"),
    body("destinationCoordinates")
      .notEmpty()
      .withMessage("destination is required"),
  ],
  rideController.createRide,
);

router.post(
  "/calculateFare",
  authMiddleware.authUser,
  [
    body("origin").notEmpty().withMessage("origin is required"),
    body("destination").notEmpty().withMessage("destination is required"),
  ],
  rideController.calculateFare,
);

module.exports = router;
