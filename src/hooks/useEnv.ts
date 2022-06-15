import debounce from 'lodash/debounce'
import { useCallback, useEffect, useRef, useState } from 'react'

type Options = { once?: boolean }

export default function useEnv(opts?: Options) {
  const [isMobile, setIsMobile] = useState(false)
  const options = useRef(opts || {})

  const resize = useCallback(
    debounce(() => {
      const width = window.innerWidth
      setIsMobile(width <= 576)
    }, 200),
    [],
  )

  useEffect(() => {
    if (!options.current.once) {
      window.addEventListener('resize', resize, false)
    }
    resize()

    return () => {
      if (!options.current.once) {
        window.removeEventListener('resize', resize, false)
      }
    }
  }, [])

  return { isMobile }
}
