export default function Loading() {
    return (
        <div className="flex flex-col mx-auto mt-8 lg:w-[90%] w-[95%]">
            <div className="h-8 w-48 bg-(--agenrap-gray-800)/20 rounded animate-pulse mb-6" />
            <div className="border rounded-md overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 border-b bg-(--agenrap-gray-800)/10 animate-pulse" />
                ))}
            </div>
        </div>
    )
}