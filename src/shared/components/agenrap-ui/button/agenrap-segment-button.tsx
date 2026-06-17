import Link from "next/link"

type Segment = {
    label: string
    active: boolean
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never })

export function AgenrapSegmentedControl({ segments }: { segments: Segment[] }) {
    return (
        <div className="flex w-full md:w-fit">
            <div className="items-center bg-(--agenrap-brown-500)/10 hidden md:flex rounded-lg p-0.5 gap-0.5">
                {segments.map(seg => <SegItem key={seg.label} seg={seg} />)}
            </div>
            <div className="items-center bg-(--agenrap-brown-500)/10 flex md:hidden w-full rounded-sm p-1 gap-0.5">
                {segments.map(seg => <SegItem key={seg.label} seg={seg} mobile />)}
            </div>
        </div>
    )
}

function SegItem({ seg, mobile }: { seg: Segment; mobile?: boolean }) {
    const activeClass = `${mobile ? "p-1" : "p-4"} rounded-sm bg-(--agenrap-brown-500) text-white text-sm font-tree font-semibold`
    const idleClass = `${mobile ? "p-1" : "p-4"} rounded-md text-(--agenrap-brown-500)/70 text-sm font-tree font-semibold hover:bg-(--agenrap-brown-500)/10 transition-colors`

    if (seg.active) return <span className={activeClass}>{seg.label}</span>
    if (seg.onClick) return <button onClick={seg.onClick} className={idleClass}>{seg.label}</button>
    return <Link href={seg.href!} className={idleClass}>{seg.label}</Link>
}
