import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/user";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      toast.error("Please fill in all fields");
      return;
    }
    axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, input)
      .then((res) => {
        toast.success("User logged in successfully");
        setInput({
          email: "",
          password: ""
        });
        dispatch(setUser({
          user: res.data.user,
          token: res.data.token,
          isLoggedIn: true
        }));
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(
          err.response.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "User login failed, please try again later."
        );
      });
  };

  return (
    <div className="px-8 py-8 flex flex-col justify-between h-screen max-w-xl mx-auto">
      <div>
        <img
          className="w-28 h-auto mt-6 mb-10 "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png"
          alt="logo"
        />
        <form
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-4">
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
          <div className="w-full text-center text-lg font-semibold " >New here?<Link to="/user-register" className="text-blue-500 font-semibold hover:underline cursor-pointer">  Create new Account</Link></div>
        </form>
      </div>
      <Link
        to="/captain-login"
        className="w-full bg-green-500 text-center text-white my-4 py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login As Captain
      </Link>
    </div>
  )
}

export default UserLogin