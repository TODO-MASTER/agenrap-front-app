import Link from "next/link"

type Segment = {
    label: string
    href: string
    active: boolean
}

export function AgenrapSegmentedControl({ segments }: { segments: Segment[] }) {
    return (
        <div className="flex w-full md:w-fit">

       
        <div className=" items-center bg-(--agenrap-brown-500)/10 hidden md:flex rounded-lg p-0.5 gap-0.5">
            {segments.map(seg => (
                seg.active
                    ? <span key={seg.label} className="p-4 rounded-sm  bg-(--agenrap-brown-500) text-white text-sm font-tree font-semibold">{seg.label}</span>
                    : <Link key={seg.label} href={seg.href} className="p-4 rounded-md text-(--agenrap-brown-500)/70 text-sm font-tree font-semibold hover:bg-(--agenrap-brown-500)/10 transition-colors">{seg.label}</Link>
            ))}
        </div>
                <div className=" items-center bg-(--agenrap-brown-500)/10 flex md:hidden w-full  rounded-sm  p-1 gap-0.5 ">
            {segments.map(seg => (
                seg.active
                    ? <span key={seg.label} className="p-1 rounded-sm   bg-(--agenrap-brown-500) text-white text-sm font-tree font-semibold">{seg.label}</span>
                    : <Link key={seg.label} href={seg.href} className="p-1  rounded-sm  text-(--agenrap-brown-500)/70 text-sm font-tree font-semibold hover:bg-(--agenrap-brown-500)/10 transition-colors">{seg.label}</Link>
            ))}
        </div>
         </div>
    )
}
