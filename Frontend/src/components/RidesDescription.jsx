import { useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaSquare } from "react-icons/fa";
import { IoCard } from "react-icons/io5";
import { useSelector } from "react-redux";
import { ridesImages } from "../utils/Constants";

const RidesDescription = ({
  setShowRidesDescription,
  showRidesDescription,
  setShowConfirmRide,
}) => {
  const ride = useSelector((state) => state.ride);
  //   const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".rides-container")) {
        setShowRidesDescription(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowRidesDescription]);

  if (!ride.from || !ride.to || !ride.fare) {
    return null;
  }

  return (
    <div
      className={`absolute ${showRidesDescription ? "" : "translate-y-full"} rides-container transition-transform duration-500 ease-in-out bottom-0 w-full max-h-[70vh] bg-white flex flex-col pt-3 p-3 rounded-t-lg `}
    >
      <div className="min-w-16 h-[5px] bg-gray-200 rounded-full absolute top-[6px] left-1/2 -translate-x-1/2"></div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold mt-1 w-full text-center text-base">
          Confirm Drive
        </h3>
        <div className="w-full  h-[3px] bg-blue-500"></div>
      </div>
      <div className="overflow-y-auto overscroll-x-contain no-scrollbar max-h-100 ">
        <img
          className="object-contain mx-auto h-40 my-3"
          src={ridesImages[ride.vehicle]}
          alt={ride.vehicle}
        />
        <div className="w-full  h-[2px] bg-gray-300"></div>
        <div className="flex items-center justify-between">
          <IoLocationSharp className="min-w-[40px]" size={20} />
          <div className="flex w-full py-3 flex-col gap-0 border-b-2 border-gray-300">
            <h3 className="font-bold flex items-center gap-2">
              {ride.from.name}
            </h3>
            <p className="text-xs font-semibold text-zinc-600">
              {ride.from.city || ride.from.country}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <FaSquare className="min-w-[40px]" size={10} />
          <div className="flex w-full py-3 flex-col gap-0 border-b-2 border-gray-300">
            <h3 className="font-bold flex items-center gap-2">
              {ride.to.name}
            </h3>
            <p className="text-xs font-semibold text-zinc-600">
              {ride.to.city || ride.to.country}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <IoCard className="min-w-[40px]" size={20} />
          <div className="flex w-full py-3 flex-col gap-0 border-b-2 border-gray-300">
            <h3 className="font-bold flex items-center gap-2">
              Rs {ride.fare[ride.vehicle]}
            </h3>
            {/* <p className="text-xs font-semibold text-zinc-600">
              {ride.fare.car}
            </p> */}
          </div>
        </div>
        <button
          className="bg-blue-500 w-full mt-2 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={() => {
            setShowRidesDescription(false);
            setShowConfirmRide(true);
          }}
        >
          Request Ride
        </button>
      </div>
    </div>
  );
};

export default RidesDescription;
