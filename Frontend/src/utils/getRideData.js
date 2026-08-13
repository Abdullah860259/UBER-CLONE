import { toast } from "sonner";
import API from "./API";

const getRideData = async (fromCo, toCo) => {
  if (!fromCo || !toCo) {
    return toast.error("Both fields are require");
  }
  const data = {
    origin: fromCo,
    destination: toCo,
  };

  try {
    const res = await API.post("/maps/get-distance-time", data);
    return res;
  } catch (error) {
    console.error(error);
    toast.error("something went wrong in fetching ride data");
  }
};

export default getRideData;
