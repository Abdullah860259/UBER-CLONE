import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../utils/API'
import { updateLoginStatus } from '../redux/user/user'
import { useDispatch } from 'react-redux'

const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const { role } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("OTP must be 6 digits");
            return;
        }
        console.log('api is runing')
        API.post(`${import.meta.env.VITE_BASE_URL}/${role}/verify-otp`, { otp })
            .then((res) => {
                navigate('/dashboard');
                dispatch(updateLoginStatus({ isLoggedIn: true }));
                console.log(res)
                toast.success(res.data.message)
            })
            .catch((e) => { console.error(e) })
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="w-96 p-6 shadow-lg rounded-lg border">
                <div className="absolute top-8 left-6 w-28 h-auto">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png" alt="logo" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">
                    OTP Verification
                </h2>
                <p className="text-center text-gray-600 mb-4">
                    Enter the 6-digit code sent to your email.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full border p-3 rounded-lg text-center text-xl tracking-widest"
                    />

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 text-white p-3 rounded-lg"
                    >
                        Verify OTP
                    </button>
                </form>
                <div className="text-center mt-4 text-blue-600 cursor-pointer">
                    <p>Resend the OTP</p>
                </div>
            </div>
        </div>
    )
}

export default OtpVerification