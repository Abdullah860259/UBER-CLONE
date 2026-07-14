import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div>
            <div className="h-screen bg-[url('/Images/homebackground.jpg')] bg-center bg-no-repeat bg-cover w-full bg-red-400 flex flex-col justify-between items-start gap-4">
                <img
                    className="w-28 h-auto mx-6 my-5 "
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png"
                    alt="logo"
                />
                <div className="bg-white w-full flex flex-col gap-12 px-4 py-4" >
                    <p className="font-bold text-4xl" >
                        Get Started with Uber
                    </p>
                    <Link to={"/user-login"} className="relative text-center bg-black w-full text-white p-4 rounded-lg text-2xl " >
                        Continue
                        <FaArrowRight className="absolute bottom-1/2 translate-y-1/2 right-4 " />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home