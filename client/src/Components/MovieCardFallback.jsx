const MovieCardFallback = () => {
    return (
        <div className={`flex-none h-[200px] w-[300px] relative scale-90 hover:scale-100 rounded-xl transition`}>
            <div className="h-full  rounded-lg flex justify-center items-center bg-[#060606] animate-pulse">
                <svg
                    className="w-10 h-10 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div className="absolute left-0 bottom-0 w-full rounded-b-lg flex justify-between items-center px-3 py-2 bg-black/40 backdrop-blur-sm">                
                <div className="w-[75%] flex flex-col space-y-1">
                    <p className="text-xl font-bold h-3 rounded-full w-full bg-gray-600 animate-pulse"></p>
                    <p className="text-xl font-bold h-3 rounded-full w-[60%] bg-gray-600 animate-pulse"></p>
                </div>
                <p className="font-semibold bg-gray-600 rounded-full mb-2 h-5 w-[20%] animate-pulse"></p>                            
            </div>
        </div>
    )
}

export default MovieCardFallback