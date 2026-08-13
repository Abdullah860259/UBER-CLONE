import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import API from "../utils/API";
import { setVehicle, updateRide } from "../redux/ride/ride";
import { toast } from "sonner";
import Loading from "./Loading";

const Rides = ({ showRides, setShowRides, setShowRidesDescription }) => {
  const ride = useSelector((state) => state.ride);
  const dispatch = useDispatch();
  const duration = () => {
    if (ride.duration > 60) {
      return Math.floor(ride.duration / 60) + " hours";
    } else {
      return ride.duration + " minutes";
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".rides-container")) {
        setShowRides(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowRides]);

  useEffect(() => {
    if (!ride.from || !ride.to || !ride.distance || !ride.duration) return;
    (async () => {
      const data = {
        origin: ride.from,
        destination: ride.to,
        distance: ride.distance,
        duration: ride.duration,
      };
      try {
        const res = await API.post("/rides/calculateFare", data);
        dispatch(updateRide({ fare: res.data }));
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    })();
  }, [ride.from, ride.to, ride.distance, ride.duration]);

  if (!ride.fare) {
    return showRides ? <Loading message="Calculating Fare" /> : null;
  }

  const rides = [
    {
      title: "moto",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4WrlJzZgQ702tEOVqYHL55-QV67FldVr6S4HkoYzZJm_udyLDCHvvx_A&s",
      price: ride.fare.moto,
    },
    {
      title: "auto",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRCLJZr_RRCH8tnbz7nJt2MIzagP9Ho-Wv8YzBK8b5dmAKQmX4XPRV2U&s",
      price: ride.fare.auto,
    },
    {
      title: "car",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6C0a8GYw74pToLU8IEkXoZ5OknozzTi0ZTkySDy5lOuNdb7Vc8EgKDgkw&s",
      price: ride.fare.car,
    },
  ];

  return (
    <div
      className={` absolute ${showRides ? "" : "translate-y-full"}  rides-container transition-transform duration-500 ease-in-out bottom-0 w-full max-h-[65vh] bg-white flex flex-col gap-3 pt-10 p-3 rounded-t-lg `}
    >
      <div className="min-w-16 h-[5px] bg-gray-200 rounded-full absolute top-[6px] left-1/2 -translate-x-1/2"></div>
      <div className="flex w-full justify-between items-center px-3">
        <p className="font-semibold text-lg ">Distance: {ride.distance} KM</p>
        <p className="font-semibold text-lg ">Duration: {duration()}</p>
      </div>
      <div className="overflow-auto">
        {rides.map((rid, idx) => (
          <div key={idx}>
            <div
              onClick={() => {
                setShowRidesDescription(true);
                dispatch(setVehicle({ vehicle: rid.title }));
              }}
              className="flex gap-3 border-[3px] border-white active:border-black p-2 rounded-lg items-center justify-between"
            >
              <img
                className="w-16 h-16 object-cover"
                src={rid.img}
                alt={rid.title}
              />
              <div className="flex w-full flex-col gap-0">
                <h3 className="font-bold flex items-center gap-2">
                  {rid.title}
                  <div className="flex items-center gap-[2px]">
                    <FaUser size={13} /> <p>4</p>
                  </div>
                </h3>
                <p className="text-xs font-semibold">{ride.to.name} </p>
                <p className="text-xs font-semibold text-zinc-600">
                  {ride.to.country}
                </p>
              </div>
              <div className="flex shrink-0">
                <p className="font-bold text-xl">Rs {rid.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rides;
