'use client'
import { getSuggestions } from "@/src/features/business/services";
import { serverAction } from "@/src/shared/lib/server-fetch.lib";
import { useEffect, useState } from "react";

export function useAtSignSuggestions(name: string) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (name.trim().length < 2) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        const timeout = setTimeout(async () => {
            const res = await getSuggestions(name);
            
            setSuggestions(res?.data ?? []);
            setIsLoading(false);
        }, 400);

        return () => clearTimeout(timeout);
    }, [name]);

    return { suggestions, isLoading };
}