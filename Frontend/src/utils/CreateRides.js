import API from "./API";

export const CreateRide = (ride) => {
  const data = {
    originCoordinates: ride.from,
    destinationCoordinates: ride.to,
  };
  API.post("/rides/create", data);
  console.log("sending message for ride");
};
