const maps = require("../services/maps.services");

module.exports.calculateFare = async (origin, destination) => {
  if (!origin || !destination)
    throw new Error("all fields are required");

  const originCoordinates = await maps.getAddressCoordinates(origin);
  if (!originCoordinates) throw new Error("Failed to find co ordiantes");

  const destinationCoordinates = await maps.getAddressCoordinates(destination);
  if (!destinationCoordinates) throw new Error("Failed to find co ordiantes");

  const { distance, duration } = await maps.getDistanceTime(
    origin,
    destination,
  );

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
  const carFare =
    (distance * pricePerKm.car) + (duration * pricePerMinute.car) + baseFare;
  const autoFare =
    distance * pricePerKm.auto + duration * pricePerMinute.auto + baseFare;
  const motoFare =
    distance * pricePerKm.moto + duration * pricePerMinute.moto + baseFare;

    

  return {
    car: Math.round(Math.trunc(carFare) / 10) * 10,
    auto: Math.round(Math.trunc(autoFare) / 10) * 10,
    moto: Math.round(Math.trunc(motoFare) / 10) * 10
  };
};
