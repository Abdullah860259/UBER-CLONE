import { FaRegDotCircle } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { GiCash } from "react-icons/gi";

const ConfirmNewRide = ({
  ride,
  confirmNewRide,
  setConfirmNewRide,
  otp,
  setOtp,
  onConfirm,
}) => {
  const onCancel = () => {
    setConfirmNewRide(false);
  };

  const {
    riderName = "Harshi Pateliya",
    riderImage = "",
    distance = "2.2 KM",
    pickup = { address: "562/11-A", area: "Kankariya Talab, Bhopal" },
    drop = { address: "562/11-A", area: "Kankariya Talab, Bhopal" },
    fare = 193.2,
    paymentMode = "Cash Cash",
  } = ride || {};

  return (
    <div
      className={`w-full ${confirmNewRide ? "absolute" : "hidden"} bottom-0 p-4 bg-white justify-center items-center flex flex-col gap-4`}
    >
      <h2 className="text-xl font-bold self-start">
        Confirm this ride to Start
      </h2>
      <div className="w-full max-w-lg flex flex-col gap-2">
        <div className="flex items-center justify-between border-2 border-yellow-400 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full object-cover bg-gray-200"
              src={riderImage}
              alt={riderName}
            />
            <p className="font-semibold">{riderName}</p>
          </div>
          <p className="font-semibold">{distance}</p>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start gap-3 py-2 border-b border-gray-200">
            <FaRegDotCircle
              className="min-w-[20px] mt-1 text-gray-700"
              size={16}
            />
            <div className="flex flex-col">
              <p className="font-semibold">{pickup.address}</p>
              <p className="text-xs text-gray-500">{pickup.area}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2 border-b border-gray-200">
            <IoLocationSharp
              className="min-w-[20px] mt-1 text-gray-700"
              size={18}
            />
            <div className="flex flex-col">
              <p className="font-semibold">{drop.address}</p>
              <p className="text-xs text-gray-500">{drop.area}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <GiCash className="min-w-[20px] mt-1 text-gray-700" size={18} />
            <div className="flex flex-col">
              <p className="font-semibold">₹{fare}</p>
              <p className="text-xs text-gray-500">{paymentMode}</p>
            </div>
          </div>
        </div>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp?.(e.target.value)}
          placeholder="Enter OTP"
          className="w-full py-3 px-4 rounded-lg bg-gray-200 placeholder-gray-500 font-semibold outline-none"
        />

        <div className="flex flex-col gap-2">
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold active:bg-green-700"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 rounded-lg bg-red-600 text-white font-semibold active:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmNewRide;
