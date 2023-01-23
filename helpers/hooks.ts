import { useMediaQuery } from '@mui/material'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

export function useCallbackRef<T>(callback: T) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return callbackRef
}

export function useLogoUrl() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')

  return useMemo(() => {
    return isDark ? '/images/logo-white.png' : '/images/logo-black.png'
  }, [isDark])
}

export function useOnTop() {
  const [onTop, setOnTop] = useState(true)

  useEffect(() => {
    function onScroll() {
      setOnTop(window.scrollY === 0)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { onTop }
}
