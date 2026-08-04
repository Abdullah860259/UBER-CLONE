import { FaAngleDown } from 'react-icons/fa'

const LeaveNow = () => {
    return (
        <div className='px-3 py-2 rounded-full bg-gray-200 w-fit flex gap-3 justify-center items-center font-semibold text-sm' >
            <FaAngleDown />
            <p>Leave Now</p>
        </div>
    )
}

export default LeaveNow