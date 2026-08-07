const rideModel = require("../modals/rides");
const calculateFare = require("../utils/CalculateFare").calculateFare;

module.exports.createRide = async ({
  userId,
  originCoordinates,
  destinationCoordinates,
}) => {
  if ((!userId, !originCoordinates, !destinationCoordinates))
    throw new Error("all fields are required");

  const fare = await calculateFare(originCoordinates, destinationCoordinates);

  try {
    const ride = await rideModel.create({
      userId,
      origin: originCoordinates,
      destination: destinationCoordinates,
      fare,
    });
    return ride;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create ride");
    return "Failed to create ride";
  }
};

module.exports.createRide;
