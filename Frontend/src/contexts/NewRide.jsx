import { useState } from "react";
import { newRideContext } from "./NewRideContext";

const NewRideProvider = ({ children }) => {
  const [newRidePopUp, setNewRidePopUp] = useState(false);
  return (
    <newRideContext.Provider value={{ newRidePopUp, setNewRidePopUp }}>
      {children}
    </newRideContext.Provider>
  );
};

export default NewRideProvider;
