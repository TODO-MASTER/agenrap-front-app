import { useState, useEffect, useCallback } from "react"

export function useLastUpdated() {
    const [lastUpdated, setLastUpdated] = useState(Date.now())
    const [label, setLabel] = useState("agora")

    const markUpdated = useCallback(() => {
        setLastUpdated(Date.now())
    }, [])

    useEffect(() => {
        function updateLabel() {
            const seconds = Math.floor((Date.now() - lastUpdated) / 1000)
            if (seconds < 10) setLabel("agora")
            else if (seconds < 60) setLabel(`há ${seconds}s`)
            else setLabel(`há ${Math.floor(seconds / 60)}min`)
        }

        updateLabel()
        const interval = setInterval(updateLabel, 5_000)
        return () => clearInterval(interval)
    }, [lastUpdated])

    return { label, markUpdated }
}