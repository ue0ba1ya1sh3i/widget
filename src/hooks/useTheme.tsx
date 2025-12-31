import { useEffect, useState } from "react"
import { listen } from "@tauri-apps/api/event"

// 自作関数
import { loadTheme, setTheme } from "../lib/theme"

function useTheme() {
  const [isDark, setIsDark] = useState<boolean | null>(null)

  useEffect(() => {
    loadTheme().then(setIsDark)

    const unlistenPromise = listen<{ isDark: boolean }>(
      "theme:update",
      e => setIsDark(e.payload.isDark)
    )

    return () => {
      unlistenPromise.then(u => u())
    }
  }, [])

  const toggleTheme = async () => {
    if (isDark === null) return
    await setTheme(!isDark)
  }

  return {
    isDark,
    toggleTheme,
    setTheme
  }
}

export { useTheme }
