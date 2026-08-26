import { PiSpeedometerBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import NewRideComponent from "./NewRideComponent";
import { useContext, useEffect, useRef, useState } from "react";
import ConfirmNewRide from "./ConfirmNewRide";
import { SocketContext } from "../contexts/CreateSocketContext";
import { updatedLocation, getDistance } from "../utils/NewLocation";
import { toast } from "sonner";

const CaptainDashBoard = () => {
  const [confirmNewRide, setConfirmNewRide] = useState(false);
  const user = useSelector((state) => state.user);
  const { sendMessage } = useContext(SocketContext);
  const lastLocation = useRef(null);

  useEffect(() => {
    const updateLocation = async () => {
      let newLocation;
      try {
        newLocation = await updatedLocation();
      } catch (error) {
        console.error(error);
        if (error.code === 1) {
          toast.error(error.message);
        }
        return;
      }

      // First location
      if (!lastLocation.current) {
        console.log("first location is sending");
        lastLocation.current = newLocation;

        sendMessage("updateLocation", {
          id: user.user._id,
          userType: user.role,
          location: [newLocation.lng, newLocation.lat],
        });

        return;
      }

      const distance = getDistance(
        lastLocation.current.lat,
        lastLocation.current.lng,
        newLocation.lat,
        newLocation.lng,
      );

      if (distance > 10) {
        sendMessage("updateLocation", {
          id: user.user._id,
          userType: user.role,
          location: [newLocation.lng, newLocation.lat],
        });

        lastLocation.current = newLocation;
      }
    };

    const interval = setInterval(updateLocation, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen relative flex flex-col overflow-hidden items-center justify-center border border-black">
      <div className="absolute left-5 top-5">
        <img
          className="w-20 h-auto "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png"
          alt="logo"
        />
      </div>
      <div className="bg-[url('/Images/homebackground.jpg')] h-screen w-screen bg-center bg-cover bg-no-repeat"></div>
      <div className="flex flex-col w-full p-5 gap-1 ">
        <div className="flex items-center px-2 py-1 ml-auto mr-2 rounded-xl gap-1 bg-green-200 w-fit broder-[2px] border-black">
          <span className="w-2 h-2 bg-green-500 rounded-full mt-[2.2px] "></span>
          <p className="text-[10px] font-semibold">active</p>
        </div>
        <div className="flex p-1 items-center ">
          <img src="" alt="" />
          <p>{user.user.fullname.firstname}</p>
          <div className="ml-auto flex flex-col px-3 ">
            <span className="font-semibold">Rs 295</span>
            <span>Earned</span>
          </div>
        </div>
        <div className="bg-[#f4f4f4] flex justify-between rounded-lg p-3 ">
          <div className="text-center ">
            <PiSpeedometerBold size={30} className="mx-auto" />
            <p className="font-semibold">10.2</p>
            <p className="text-gray-700">Hours Online</p>
          </div>
          <div className="text-center ">
            <PiSpeedometerBold size={30} className="mx-auto" />
            <p className="font-semibold">10.2</p>
            <p className="text-gray-700">Hours Online</p>
          </div>
          <div className="text-center ">
            <PiSpeedometerBold size={30} className="mx-auto" />
            <p className="font-semibold">10.2</p>
            <p className="text-gray-700">Hours Online</p>
          </div>
        </div>
      </div>
      <NewRideComponent
        setConfirmNewRide={setConfirmNewRide}
      />
      <ConfirmNewRide
        confirmNewRide={confirmNewRide}
        setConfirmNewRide={setConfirmNewRide}
      />
    </div>
  );
};

export default CaptainDashBoard;
