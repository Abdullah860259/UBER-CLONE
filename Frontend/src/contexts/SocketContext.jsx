import { useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { SocketContext } from "./CreateSocketContext";
import { useDispatch, useSelector } from "react-redux";
import { updateRide } from "../redux/ride/ride";
import { newRideContext } from "./NewRideContext";

const SocketProvider = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  const userType = useSelector((state) => state.user.role);
  const { setNewRidePopUp } = useContext(newRideContext);
  const dispatch = useDispatch();
  const socket = io(import.meta.env.VITE_BASE_URL, {
    auth: {
      token: token,
      userType: userType,
    },
  });
  useEffect(() => {
    console.log(import.meta.env.VITE_BASE_URL, "vite base url");
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("newRide", (data) => {
      console.log(data);
      dispatch(updateRide(data));
      setNewRidePopUp(true);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected to server");
    });
    socket.on("connect_error", (error) => {
      console.log("Connection error:", error.message);
    });
    return () => {
      socket.off();
    };
  }, []);

  const sendMessage = (eventName, message) => {
    console.log(`sending ${eventName} message to server`);
    socket.emit(eventName, message);
  };

  const recieveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  return (
    <SocketContext.Provider value={{ sendMessage, recieveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
