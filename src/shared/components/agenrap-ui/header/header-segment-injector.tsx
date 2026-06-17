'use client'
import { useHeaderSegments, type Segment } from '@/src/providers/header-segments-provider'
import { useEffect } from 'react'

export function HeaderSegmentInjector({ segments }: { segments: Segment[] }) {
    const { setSegments } = useHeaderSegments()

    useEffect(() => {
        setSegments(segments)
        return () => setSegments([])
    }, [JSON.stringify(segments)])

    return null
}