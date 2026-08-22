import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashBoard";
import CaptainDashboard from "../components/CaptainDashBoard";

const DashBoard = () => {
  const user = useSelector((state) => state.user);
  return user?.role === "user" ? <UserDashboard /> : <CaptainDashboard />;
};

export default DashBoard;
