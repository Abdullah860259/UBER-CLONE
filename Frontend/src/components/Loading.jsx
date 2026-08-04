const Loading = ({ status }) => {
    return <>
        <div className="w-full h-full flex flex-col gap-3 items-center justify-center p-4">
            <div className="relative w-14 h-14">
                <div className="absolute inset-0 w-14 h-14 border-2 border-blue-500  border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-2 w-10 h-10 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p>{status || 'Loading...'}</p>
        </div>
    </>
}

export default Loading