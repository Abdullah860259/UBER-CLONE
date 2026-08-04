import { HiLocationMarker } from "react-icons/hi";

const Locations = ({ setShowRides, setShowPannel }) => {
    // Dummy data
    const data = [
        {
            title: 'Lorem ipsum dolo.',
            subtitle: 'Lorem ipsum dolor sit ametelit.',
            discription: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, assumenda.'
        },
        {
            title: 'Lorem ipsum dolo.',
            subtitle: 'Lorem ipsum dolor sit ametelit.',
            discription: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, assumenda.'
        },
        {
            title: 'Lorem ipsum dolo.',
            subtitle: 'Lorem ipsum dolor sit ametelit.',
            discription: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, assumenda.'
        },
        {
            title: 'Lorem ipsum dolo.',
            subtitle: 'Lorem ipsum dolor sit ametelit.',
            discription: ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, assumenda.'
        }
    ]

    return (
        <div className="flex flex-col overflow-auto">
            {data.map((e, index) => (
                <div
                    key={index}
                    className="p-3 border-b flex justify-between items-center gap-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowPannel(false);
                        setShowRides(true)
                    }}
                >
                    <div className='relative min-w-9 h-9 rounded-full bg-gray-300' >
                        <HiLocationMarker size={25} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full' />
                    </div>
                    <div>
                        <h2 className="font-bold">{e.title}</h2>
                        <p>{e.subtitle}</p>
                        <small >{e.discription}</small>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Locations