import { useEffect, useState } from 'react'

export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setMatches(false)
      return
    }

    const matchMedia = window.matchMedia(query)
    setMatches(matchMedia.matches)

    const handleChange = () => setMatches(matchMedia.matches)

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
