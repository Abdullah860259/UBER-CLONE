const rideServices = require("../services/ride.services");
const { validationResult } = require("express-validator");
const { calculateFare } = require("../utils/CalculateFare");
const { sendMessageToSocketId } = require("../utils/SocketIo");
const captainModal = require("../modals/captain.modal");

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
    console.log(originCoordinates, destinationCoordinates);
    const captains = await captainModal.find({
      status: "active",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [originCoordinates.lng, originCoordinates.lat],
          },
          $maxDistance: 50000,
        },
      },
    });
    for (const captain of captains) {
      console.log(ride,captain.socketId);
      sendMessageToSocketId(ride, captain.socketId, "newRide");
      console.log(captain,'this is selected captain');
    }
    // I am sending the newRide event to the userId, I should send it to the captain
    res.status(201).json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create ride");
  }
};

module.exports.calculateFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { origin, destination, distance, duration } = req.body;

  try {
    const data = await calculateFare(origin, destination);
    console.log(data, "data");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};
