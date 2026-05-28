import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ACCENTS = {
  indigo: { accent: '#6366f1', accent2: '#8b5cf6', accent3: '#ec4899' },
  emerald: { accent: '#10b981', accent2: '#14b8a6', accent3: '#84cc16' },
  amber: { accent: '#f59e0b', accent2: '#f97316', accent3: '#ef4444' },
  sky: { accent: '#0ea5e9', accent2: '#3b82f6', accent3: '#6366f1' },
  rose: { accent: '#f43f5e', accent2: '#ec4899', accent3: '#a855f7' },
}

const ThemeContext = createContext(null)

function readStored(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ?? fallback
  } catch {
    return fallback
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => readStored('boss.theme', 'dark'))
  const [accent, setAccent] = useState(() => readStored('boss.accent', 'indigo'))

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('boss.theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    const c = ACCENTS[accent] || ACCENTS.indigo
    root.style.setProperty('--accent', c.accent)
    root.style.setProperty('--accent-2', c.accent2)
    root.style.setProperty('--accent-3', c.accent3)
    root.style.setProperty('--accent-soft', `${c.accent}29`)
    try {
      localStorage.setItem('boss.accent', accent)
    } catch {
      /* ignore */
    }
  }, [accent])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, accent, setAccent, accents: ACCENTS }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export { ACCENTS }
