'use client'
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react'

type Segment = { label: string; href: string; active: boolean }

type HeaderSegmentsCtx = {
    segments: Segment[]
    setSegments: Dispatch<SetStateAction<Segment[]>>
}

const HeaderSegmentsContext = createContext<HeaderSegmentsCtx | null>(null)

export function HeaderSegmentsProvider({ children }: { children: React.ReactNode }) {
    const [segments, setSegments] = useState<Segment[]>([])
    return (
        <HeaderSegmentsContext.Provider value={{ segments, setSegments }}>
            {children}
        </HeaderSegmentsContext.Provider>
    )
}

export function useHeaderSegments() {
    const ctx = useContext(HeaderSegmentsContext)
    return ctx
}