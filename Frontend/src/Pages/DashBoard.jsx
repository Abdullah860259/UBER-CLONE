import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashBoard";
import CaptainDashboard from "../components/CaptainDashBoard";
import { useContext } from "react";
import { SocketContext } from "../contexts/CreateSocketContext";

const DashBoard = () => {
  const user = useSelector((state) => state.user);
  const { sendMessage } = useContext(SocketContext);
  sendMessage("join", { user: user.user, userType: user.role });
  return user?.role === "user" ? <UserDashboard /> : <CaptainDashboard />;
};

export default DashBoard;
