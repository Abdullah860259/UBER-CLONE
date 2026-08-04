import { useState } from "react"
import Search from "../components/Search"
import Rides from "../components/Rides"
import RidesDescription from "../components/RidesDescription"
import ConfirmRide from "../components/ConfirmRide"

const DashBoard = () => {
  const [showPannel, setShowPannel] = useState(false);
  const [showRides, setShowRides] = useState(false);
  const [showRidesDescription, setShowRidesDescription] = useState(false);
  const [showConfirmRide, setShowConfirmRide] = useState(false);

  return (
    <div className="w-screen h-screen relative flex flex-col overflow-hidden items-center justify-center border border-black">
      <div className="absolute left-5 top-5">
        <img
          className="w-20 h-auto "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png"
          alt="logo"
        />
      </div>
      <div className="bg-[url('/Images/homebackground.jpg')] h-screen w-screen bg-center bg-cover bg-no-repeat" ></div>
      <Search showPannel={showPannel} setShowPannel={setShowPannel} setShowRides={setShowRides} />
      <Rides showRides={showRides} setShowRides={setShowRides} setShowRidesDescription={setShowRidesDescription} />
      <RidesDescription setShowRidesDescription={setShowRidesDescription} showRidesDescription={showRidesDescription} setShowConfirmRide={setShowConfirmRide} />
      <ConfirmRide showConfirmRide={showConfirmRide} setShowConfirmRide={setShowConfirmRide} />
    </div>
  )
}

export default DashBoard