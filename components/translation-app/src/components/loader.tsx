export const Loader = () => {
    return (
        <div role="status" className="animate-pulse mx-auto max-w-[1200px] my-10">
            <div className="h-2.5 bg-gray-100 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-100 rounded-full max-w-[400px] mb-2.5"></div>
            <div className="h-2 bg-gray-100 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-100 rounded-full  max-w-[370px] mb-2.5"></div>
            <div className="h-2 bg-gray-100 rounded-full  max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-100 rounded-full  max-w-[370px]"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};
