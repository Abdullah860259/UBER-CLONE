import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainRegister = () => {

    const [input, setInput] = useState({
        fullname: {
            "firstname": "",
            "lastname": ""
        },
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        setInput({
            fullname: {
                "firstname": "",
                "lastname": ""
            },
            email: "",
            password: ""
        });
    };

    return (
        <div className="px-8 py-8 flex flex-col justify-between h-screen max-w-xl mx-auto ">
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