'use client'

export const setPendingRap = (rap: string) => {
    document.cookie = `pendingRap=${rap}; path=/; max-age=3600`
}
export const clearPendingRap = () => {
    document.cookie = 'pendingRap=; path=/; max-age=0'
}
export const getPendingRap = () => {
    return document.cookie
        .split('; ')
        .find(r => r.startsWith('pendingRap='))
        ?.split('=')[1]
}