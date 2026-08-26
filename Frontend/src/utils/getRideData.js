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
    console.log(res.data,'res from ride data');
    if (res?.data.duration === "infinite" || res?.data.distance === "infinite") {
      toast.error('This distance is not reachable')
      throw new Error("This distance is not reachable");
    }
    return res;
  } catch (error) {
    console.error(error);
    console.log(error);
    toast.error( "something went wrong in fetching ride data");
  }
};

export default getRideData;
