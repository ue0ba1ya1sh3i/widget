import { useEffect } from "react"
import { listen } from "@tauri-apps/api/event"

// 自作関数
import { getSettingsStore } from "../lib/store"

export function useThemeSetup() {
  useEffect(() => {
    let unlisten: (() => void) | null = null

    // 非同期処理は別関数に
    const init = async () => {
      try {
        const store = await getSettingsStore()
        const dark = await store.get("settingsTheme")
        if (dark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }

        // 他ウィンドウからの更新を監視
        unlisten = (await listen<{ isDark: boolean }>("theme:update", (event) => {
          if (event.payload.isDark) {
            document.documentElement.classList.add("dark")
          } else {
            document.documentElement.classList.remove("dark")
          }
        })) as () => void
      } catch (e) {
        console.error("theme setup error:", e)
      }
    }

    init()

    // クリーンアップ
    return () => {
      unlisten?.()
    }
  }, [])
}
