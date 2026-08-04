import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/user"
import { Link } from "react-router-dom"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CaptainLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.password || !input.email) {
            toast.error("Fill all fields")
            return;
        }
        axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, input)
            .then((res) => {
                setInput({
                    email: "",
                    password: ""
                })
                dispatch(setUser({
                    user: res.data.user,
                    token: res.data.token,
                    role: 'captain',
                    isLoggedIn: true
                }))
                navigate("/dashboard");
            })
            .catch((err) => {
                toast.error(
                    err.response.data?.message ||
                    err.response?.data?.errors?.[0]?.msg ||
                    "User login failed, please try again later."
                );
            })
    };

    return (
        <div className="px-6 py-8 flex flex-col justify-between h-screen max-w-xl mx-auto">
            <div>
                <img
                    className="w-36 h-auto mt-6"
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                    alt="logo"
                />
                <form
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="flex pl-2 flex-col gap-4">
                        <h3 className="text-2xl font-semibold " >What's your email?</h3>
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
                        <button
                            type="submit"
                            className="bg-black text-white my-4 py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                    <div className="w-full text-center text-lg font-semibold " >New here?<Link to="/captain-register" className="text-blue-500 font-semibold hover:underline cursor-pointer">  Create new Account</Link></div>
                </form>
            </div>
            <Link
                to="/user-login"
                className="w-full text-center bg-blue-500 text-white my-4 py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Login As Rider
            </Link>
        </div>
    )
}

export default CaptainLogin