import { useState } from "react"
import { IoIosClose } from "react-icons/io";
import LeaveNow from "./LeaveNow";
import Locations from "./Locations";

const Search = ({ showPannel, setShowPannel, setShowRides }) => {
    const [form, setForm] = useState({
        from: '',
        to: ''
    })
    return (
        <>
            <div
                className={` absolute bg-white ${showPannel ? '' : 'rounded-t-2xl'} h-screen flex flex-col gap-3 bottom-0 w-full px-4 py-3 transition-transform duration-500 ease-in-out ${showPannel ? 'translate-y-0' : 'translate-y-[68%]'}`}
                onClick={() => setShowPannel(true)} >
                <div className="flex justify-between" >
                    <p className='font-bold text-xl ' >Find a trip</p>
                    {showPannel && <IoIosClose size={30}
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowPannel(false)
                        }} />}
                </div>
                <div className='relative flex flex-col gap-4' >
                    <input
                        className='rounded-md py-3 pl-12 bg-gray-200 outline-none'
                        onClick={(e) => setForm({ ...form, from: e.target.value })}
                        placeholder='Add a Pickup Location'
                        type="text" />
                    <div className='absolute left-5 h-full flex flex-col justify-center items-center gap-1' >
                        <div className='w-[7px] h-[7px] rounded-full border-2 border-black'></div>
                        <div className='h-[40%] w-[2px] bg-black' ></div>
                        <div className='w-[7px] h-[7px] border-2 border-black'></div>
                    </div>
                    <input
                        className='rounded-md py-3 pl-12 bg-gray-200 outline-none'
                        onClick={(e) => setForm({ ...form, to: e.target.value })}
                        placeholder='Enter Your desired Location'
                        type="text" />
                </div>
                <LeaveNow />
                {showPannel && (<Locations setShowRides={setShowRides} setShowPannel={setShowPannel} />)}
            </div >
        </>
    )
}

export default Search