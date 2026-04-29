export default function ServiceShowcaseHeader(){   
    return(         
            <header className="flex flex-wrap relative  z-0   w-full md:justify-between lg:h-48 md:h-32">
                <div className="flex items-center justify-center w-full md:w-auto h-full">
                    <p className="font-tree lg:text-4xl md:text-3xl text-2xl  lg:px-10 md:px-4 md:py-0 p-10">Olá, sou Clarvis!</p>
                    <div className="absolute h-1 w-full -z-10 bg-(--agenrap-purple-500) bottom-0  flex"></div>
                </div>

                <div className="flex lg:w-[40%] md:w-[60%] w-full md:h-auto h-24 ">
                    <div className="flex w-full  bg-(--agenrap-purple-500) "></div>
                    <div className="flex w-full bg-(--agenrap-pure-white)"></div>
                    <div className="flex w-full bg-(--agenrap-yellow-200)"></div>
                </div>

            </header>
    )
}