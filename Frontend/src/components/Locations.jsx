import { HiLocationMarker } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { updateRide } from "../redux/ride/ride";

const Locations = ({
  suggestions,
  focusedElement,
  setForm,
  form,
  searchBut,
  to,
}) => {
  const dispatch = useDispatch();

  if (suggestions?.length === 0 || !suggestions) {
    return <div>Search Something</div>;
  }
  return (
    <div className="flex flex-col overflow-auto">
      {suggestions.map((ele, index) => (
        <div
          key={index}
          className="p-3 border-b flex justify-between items-center gap-5"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(updateRide({ [focusedElement || "from"]: ele }));
            if (focusedElement === "from") {
              to.current.focus();
            }
            setForm({
              ...form,
              [focusedElement || "from"]:
                `${ele.name}, ${ele.city}, ${ele.country}`,
            });
            const prev =
              JSON.parse(localStorage.getItem("prevSearchedItems")) || [];
            if (!prev.some((pre) => pre.name === ele.name)) {
              prev.push(ele);
            }
            if (prev.length > 5) {
              prev.shift();
            }
            localStorage.setItem("prevSearchedItems", JSON.stringify(prev));
          }}
        >
          <div className="relative min-w-9 h-9 rounded-full bg-gray-300">
            <HiLocationMarker
              size={25}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            />
          </div>
          <div className="w-full">
            <h2 className="font-bold">{ele.name}</h2>
            <p>{ele.country}</p>
            <small>{ele.city}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Locations;
