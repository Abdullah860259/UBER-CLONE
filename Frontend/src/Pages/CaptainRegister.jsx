import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from '../redux/user/user'
import { useNavigate } from "react-router-dom";

const CaptainRegister = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: {
            "firstname": "",
            "lastname": ""
        },
        email: "",
        password: "",
        vehicle: {
            color: "",
            plate: "",
            capacity: "",
            vehicleType: ""
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.fullname.firstname || !input.email || !input.password || !input.fullname.lastname || !input.vehicle.color || !input.vehicle.plate || !input.vehicle.capacity || !input.vehicle.vehicleType) {
            toast.error("Fill all the fields");
            return;
        }
        axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, input)
            .then((res) => {
                toast.success("Captain created successfully");
                navigate(`/otp-verification/captains`);
                setInput({
                    fullname: {
                        "firstname": "",
                        "lastname": ""
                    },
                    email: "",
                    password: "",
                    vehicle: {
                        color: "",
                        plate: "",
                        capacity: "",
                        vehicleType: ""
                    }
                });
                dispatch(setUser({
                    user: res.data.userObj,
                    token: res.data.token,
                    isLoggedIn: false
                }))
            })
            .catch((err) => {
                toast.error(
                    err.response?.data?.errors?.[0]?.msg ||
                    err.response?.data?.message ||
                    "Something went wrong"
                );
                setInput({ ...input, password: "" });
            })
    };

    return (
        <div className="px-8 py-8 flex flex-col justify-between h-screen max-w-xl mx-auto ">
            <div>
                <img
                    className="w-28 h-auto mt-6 mb-10 "
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                    alt="logo"
                />
                <form
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold " >Fullname</h3>
                        <div className="flex gap-2 overflow-hidden" >
                            <input
                                type="text"
                                placeholder="uber@"
                                value={input.fullname.firstname}
                                onChange={(e) => setInput({ ...input, fullname: { "firstname": e.target.value, "lastname": input.fullname.lastname } })}
                                className="border w-1/2 border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="uber@example.com"
                                value={input.fullname.lastname}
                                onChange={(e) => setInput({ ...input, fullname: { "firstname": input.fullname.firstname, "lastname": e.target.value } })}
                                className="border w-1/2 border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold " >Email</h3>
                        <input
                            type="email"
                            placeholder="uber@example.com"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, email: e.target.value })}
                            className="border border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <h3 className="text-2xl font-semibold " >Password</h3>
                        <input
                            type="password"
                            placeholder="Password"
                            value={input.password}
                            onChange={(e) => setInput({ ...input, password: e.target.value })}
                            className="border border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <h3 className="text-2xl font-semibold " >Vehicle</h3>
                        <div className="grid grid-cols-2 gap-2 overflow-hidden" >
                            <input
                                type="text"
                                placeholder="Color"
                                value={input.vehicle.color}
                                onChange={(e) => setInput({ ...input, vehicle: { ...input.vehicle, color: e.target.value } })}
                                className="border w-full border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Number Plate"
                                value={input.vehicle.plate}
                                onChange={(e) => setInput({ ...input, vehicle: { ...input.vehicle, plate: e.target.value } })}
                                className="border w-full border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Capacity"
                                value={input.vehicle.capacity}
                                onChange={(e) => setInput({ ...input, vehicle: { ...input.vehicle, capacity: e.target.value } })}
                                className="border w-full border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={input.vehicle.vehicleType}
                                onChange={(e) => setInput({ ...input, vehicle: { ...input.vehicle, vehicleType: e.target.value } })}
                                className="border w-full border-gray-300 rounded-lg py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Vehicle Type</option>
                                <option value="car">Car</option>
                                <option value="auto">Auto</option>
                                <option value="bike">Bike</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white my-4 py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register as Captain
                        </button>
                    </div>
                    <div className="w-full text-center text-lg font-semibold " >Already have an account?<Link to="/captain-login" className="text-blue-500 font-semibold hover:underline cursor-pointer">  Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default CaptainRegister