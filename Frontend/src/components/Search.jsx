import { useCallback, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Locations from "./Locations";
import withDebounce from "../utils/debounce";
import API from "../utils/API";
import Loading from "../components/Loading";
import { toast } from "sonner";
import getRideData from "../utils/getRideData";
import { useDispatch, useSelector } from "react-redux";
import { updateRide } from "../redux/ride/ride";
import BtnLoading from "../components/BtnLoading";

const Search = ({ showPannel, setShowPannel, setShowRides }) => {
  const [form, setForm] = useState({
    from: "",
    to: "",
  });
  const from = useRef(null);
  const to = useRef(null);
  const searchBut = useRef(null);
  const [suggestions, setSuggestions] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem("prevSearchedItems"));
    return storedItems?.slice(storedItems.length - 5).reverse() || null;
  });
  const [loading, setLoading] = useState(false);
  const [butLoading, setButLoading] = useState(false);
  const [error, setError] = useState(false);
  const [focusedElement, setFocusedElement] = useState(null);
  const ride = useSelector((state) => state.ride);
  const dispatch = useDispatch();

  const fetchSuggestions = async (value) => {
    if (value.length < 3) {
      return;
    }
    try {
      setError(false);
      setLoading(true);
      const res = await API.get(`/maps/get-suggestions?q=${value}`);
      setSuggestions(
        res.data.filter((ele, index, arr) => {
          return index === arr.findIndex((x) => x.name === ele.name);
        }),
      );
    } catch (error) {
      setError(error);
      console.log(error.response);
      toast.error(
        error.response?.data?.error?.[0]?.msg || `Something went wrong`,
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestionsDe = useCallback(withDebounce(fetchSuggestions, 500));

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    fetchSuggestionsDe(value);
  };

  return (
    <>
      <div
        className={` absolute bg-white ${showPannel ? "" : "rounded-t-2xl"} h-screen flex flex-col gap-3 bottom-0 w-full px-4 py-3 transition-transform duration-500 ease-in-out ${showPannel ? "translate-y-0" : "translate-y-[68%]"}`}
        onClick={() => {
          setShowPannel(true);
          if (!showPannel) {
            from.current.focus();
          }
        }}
      >
        <div className="flex justify-between">
          <p className="font-bold text-xl ">Find a trip</p>
          {showPannel && (
            <IoIosClose
              size={30}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowPannel(false);
              }}
            />
          )}
        </div>
        <div className="relative flex flex-col gap-4">
          <input
            className="rounded-md py-3 pl-12 bg-gray-200 outline-none"
            name="from"
            onChange={handleChange}
            onFocus={(e) => setFocusedElement(e.target.name)}
            placeholder="Add a Pickup Location"
            ref={from}
            type="text"
            value={form.from}
          />
          <div className="absolute left-5 h-full flex flex-col justify-center items-center gap-1">
            <div className="w-[7px] h-[7px] rounded-full border-2 border-black"></div>
            <div className="h-[40%] w-[2px] bg-black"></div>
            <div className="w-[7px] h-[7px] border-2 border-black"></div>
          </div>
          <input
            className="rounded-md py-3 pl-12 bg-gray-200 outline-none"
            name="to"
            onChange={handleChange}
            onFocus={(e) => setFocusedElement(e.target.name)}
            placeholder="Enter Your desired Location"
            ref={to}
            type="text"
            value={form.to}
          />
        </div>
        <button
          className={`bg-black rounded-md ${butLoading ? "opacity-50" : "opacity-100"} text-white flex justify-center items-center gap-4 min-w-[200px] p-2 w-full mx-auto  `}
          disabled={butLoading}
          onClick={async (e) => {
            setButLoading(true);
            e.stopPropagation();
            try {
              const res = await getRideData(ride.from, ride.to);
              console.log(res, "res");
              dispatch(
                updateRide({
                  distance: res.data.distance,
                  duration: res.data.duration,
                }),
              );
              setShowPannel(false);
              setShowRides(true);
            } catch (error) {
              console.log(error);
            }
            setButLoading(false);
          }}
          ref={searchBut}
        >
          Search {butLoading ? <BtnLoading /> : ""}
        </button>
        {showPannel &&
          (error ? (
            <div onClick={() => setError(false)}>
              {error.response?.data?.error?.[0]?.msg || `Something went wrong`}
            </div>
          ) : !loading ? (
            <Locations
              form={form}
              setForm={setForm}
              from={from}
              to={to}
              focusedElement={focusedElement}
              suggestions={suggestions}
            />
          ) : (
            <Loading message="Loading Locations" />
          ))}
      </div>
    </>
  );
};

export default Search;
