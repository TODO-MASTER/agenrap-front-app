'use client'
import { useHeaderSegments } from '@/src/providers/header-segments-provider';
import { useEffect } from 'react'


type Segment = { label: string; href: string; active: boolean }

export function HeaderSegmentInjector({ segments }: { segments: Segment[] }) {
    const { setSegments } = useHeaderSegments()

    useEffect(() => {
        setSegments(segments)
        return () => setSegments([])
    }, [])

    return null
}