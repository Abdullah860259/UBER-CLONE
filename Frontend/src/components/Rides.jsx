import { useEffect } from 'react';
import LeaveNow from './LeaveNow'
import { FaUser } from "react-icons/fa";

const Rides = ({ showRides, setShowRides, setShowRidesDescription }) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.rides-container')) {
                setShowRides(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowRides]);

    return (
        <div className={`absolute ${showRides ? '' : 'translate-y-full'} rides-container transition-transform duration-500 ease-in-out bottom-0 w-full max-h-[65vh] bg-white flex flex-col gap-3 pt-10 p-3 rounded-t-lg `} >
            <div className='min-w-16 h-[5px] bg-gray-200 rounded-full absolute top-[6px] left-1/2 -translate-x-1/2' ></div>
            <LeaveNow />
            <div className='overflow-auto' >
                <div>
                    <div
                        onClick={() => setShowRidesDescription(true)}
                        className='flex gap-3 border-[3px] border-white active:border-black p-2 rounded-lg items-center justify-between' >
                        <img className='w-16 h-16 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6C0a8GYw74pToLU8IEkXoZ5OknozzTi0ZTkySDy5lOuNdb7Vc8EgKDgkw&s" alt="car" />
                        <div className='flex w-full flex-col gap-0' >
                            <h3 className='font-bold flex items-center gap-2' >UberGo
                                <div className='flex items-center gap-[2px]' >
                                    <FaUser size={13} /> <p>4</p>
                                </div>
                            </h3>
                            <p className='text-xs font-semibold' >Lorem ipsum dolor sit </p>
                            <p className='text-xs font-semibold text-zinc-600' >Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className='flex shrink-0' >
                            <p className='font-bold text-xl' >Rs 193.20</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        onClick={() => setShowRidesDescription(true)}
                        className='flex gap-3 border-[3px] border-white active:border-black p-2 rounded-lg items-center justify-between' >
                        <img className='w-16 h-16 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4WrlJzZgQ702tEOVqYHL55-QV67FldVr6S4HkoYzZJm_udyLDCHvvx_A&s" alt="bike" />
                        <div className='flex w-full flex-col gap-0' >
                            <h3 className='font-bold flex items-center gap-2' >UberGo
                                <div className='flex items-center gap-[2px]' >
                                    <FaUser size={13} /> <p>4</p>
                                </div>
                            </h3>
                            <p className='text-xs font-semibold' >Lorem ipsum dolor sit </p>
                            <p className='text-xs font-semibold text-zinc-600' >Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className='flex shrink-0' >
                            <p className='font-bold text-xl' >Rs 193.20</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        onClick={() => setShowRidesDescription(true)}
                        className='flex gap-3 border-[3px] border-white active:border-black p-2 rounded-lg items-center justify-between' >
                        <img className='w-16 h-16 object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRCLJZr_RRCH8tnbz7nJt2MIzagP9Ho-Wv8YzBK8b5dmAKQmX4XPRV2U&s" alt="car" />
                        <div className='flex w-full flex-col gap-0' >
                            <h3 className='font-bold flex items-center gap-2' >UberGo
                                <div className='flex items-center gap-[2px]' >
                                    <FaUser size={13} /> <p>4</p>
                                </div>
                            </h3>
                            <p className='text-xs font-semibold' >Lorem ipsum dolor sit </p>
                            <p className='text-xs font-semibold text-zinc-600' >Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className='flex shrink-0' >
                            <p className='font-bold text-xl' >Rs 193.20</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rides