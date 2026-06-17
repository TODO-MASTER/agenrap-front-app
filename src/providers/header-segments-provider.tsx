'use client'
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react'

export type Segment = {
    label: string
    active: boolean
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never })

type HeaderSegmentsCtx = {
    segments: Segment[]
    setSegments: Dispatch<SetStateAction<Segment[]>>
}

const HeaderSegmentsContext = createContext<HeaderSegmentsCtx>({
    segments: [],
    setSegments: () => {},
})

export function HeaderSegmentsProvider({ children }: { children: React.ReactNode }) {
    const [segments, setSegments] = useState<Segment[]>([])
    return (
        <HeaderSegmentsContext.Provider value={{ segments, setSegments }}>
            {children}
        </HeaderSegmentsContext.Provider>
    )
}

export function useHeaderSegments() {
    return useContext(HeaderSegmentsContext)
}