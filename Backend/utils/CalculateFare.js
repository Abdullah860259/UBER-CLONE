const maps = require("../services/maps.services");

const vehicleTypes = ["moto", "auto", "car"];

module.exports.calculateFare = async (origin, destination, vehicleType) => {
  if (!origin || !destination || !vehicleType)
    throw new Error("all fields are required");

  if (!vehicleTypes.includes(vehicleType))
    throw new Error("invalid Vehicle Type");

  const originCoordinates = await maps.getAddressCoordinates(origin);
  if (!originCoordinates) throw new Error("Failed to find co ordiantes");

  const destinationCoordinates = await maps.getAddressCoordinates(destination);
  if (!destinationCoordinates) throw new Error("Failed to find co ordiantes");
  console.log(originCoordinates, destinationCoordinates);
  const { distance, duration } = await maps.getDistanceTime(
    originCoordinates,
    destinationCoordinates,
  );
  console.log(distance, duration);
  if (!distance || !duration)
    throw new Error("failed to fetch distance or time");

  const baseFare = 10;
  const pricePerKm = {
    moto: 8,
    auto: 10,
    car: 15,
  };
  const pricePerMinute = {
    moto: 4,
    auto: 7,
    car: 11,
  };
  const fare =
    distance * pricePerKm[vehicleType] +
    duration * pricePerMinute[vehicleType] +
    baseFare;
    
  return Math.round(Math.trunc(fare) / 10) * 10;
};

module.exports.calculateFare("sargodha", "karachi", "car");
