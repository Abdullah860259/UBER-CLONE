const rideServices = require("../services/ride.services");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { originCoordinates, destinationCoordinates } = req.body;
  try {
    const ride = await rideServices.createRide({
      userId: req.user.id,
      originCoordinates,
      destinationCoordinates,
    });
    res.status(201).json({ ride });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create ride");
  }
};
