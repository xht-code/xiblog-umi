import debounce from 'lodash/debounce'
import { useCallback, useEffect, useState } from 'react'

export default function useEnv() {
  const [isMobile, setIsMobile] = useState(false)

  const resize = useCallback(
    debounce(() => {
      const width = window.innerWidth
      setIsMobile(width <= 576)
    }, 200),
    [],
  )

  useEffect(() => {
    window.addEventListener('resize', resize, false)

    return () => {
      window.removeEventListener('resize', resize, false)
    }
  }, [])

  return { isMobile }
}
