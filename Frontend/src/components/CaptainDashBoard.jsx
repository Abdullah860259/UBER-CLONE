import { PiSpeedometerBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import NewComponent from "./NewComponent";
import { useState } from "react";
import ConfirmNewRide from "./ConfirmNewRide";

const CaptainDashBoard = () => {
  const [newRide, setNewRide] = useState(true);
  const [confirmNewRide, setConfirmNewRide] = useState(false);
  const user = useSelector((state) => state.user);
  console.log(user);
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
      <div className="flex flex-col w-full p-5 gap-3 ">
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
      <NewComponent newRide={newRide} setNewRide={setNewRide} setConfirmNewRide={setConfirmNewRide} />
      <ConfirmNewRide confirmNewRide={confirmNewRide} setConfirmNewRide={setConfirmNewRide} />
    </div>
  );
};

export default CaptainDashBoard;
