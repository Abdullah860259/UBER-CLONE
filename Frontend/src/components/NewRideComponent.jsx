import { FaRegDotCircle } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { GiCash } from "react-icons/gi";
import { useContext } from "react";
import { newRideContext } from "../contexts/NewRideContext";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const NewComponent = ({ setConfirmNewRide }) => {
  const onIgnore = () => {
    setNewRidePopUp(false);
  };
  const onAccept = () => {
    setConfirmNewRide(true);
  };
  const { newRidePopUp, setNewRidePopUp } = useContext(newRideContext);
  const ride = useSelector((state) => state.ride);
  if (!ride) {
    <Loading />;
  }
  return (
    <div
      className={`w-full ${newRidePopUp ? "absolute" : "hidden"} bottom-0 p-4 bg-white justify-center items-center flex flex-col gap-4`}
    >
      <h2 className="text-xl font-bold">New Ride Available!</h2>
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between bg-yellow-400 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full object-cover bg-gray-200"
              src={ride?.riderImage}
              alt={ride?.riderName}
            />
            <p className="font-semibold">{ride?.riderName}</p>
          </div>
          <p className="font-semibold">{ride?.distance}</p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-3 py-2 border-b border-gray-200">
            <FaRegDotCircle
              className="min-w-[20px] mt-1 text-gray-700"
              size={16}
            />
            <div className="flex flex-col">
              <p className="font-semibold">{ride?.pickup?.address}</p>
              <p className="text-xs text-gray-500">{ride?.pickup?.area}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2 border-b border-gray-200">
            <IoLocationSharp
              className="min-w-[20px] mt-1 text-gray-700"
              size={18}
            />
            <div className="flex flex-col">
              <p className="font-semibold">{ride?.drop?.address}</p>
              <p className="text-xs text-gray-500">{ride?.drop?.area}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <GiCash className="min-w-[20px] mt-1 text-gray-700" size={18} />
            <div className="flex flex-col">
              <p className="font-semibold">₹{ride?.fare?.car}</p>
              <p className="text-xs text-gray-500">{ride?.paymentMode}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onAccept}
            className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold active:bg-green-700"
          >
            Accept
          </button>
          <button
            onClick={onIgnore}
            className="w-full py-3 rounded-lg bg-gray-200 text-black font-semibold active:bg-gray-300"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewComponent;
