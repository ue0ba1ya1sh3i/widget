import { useEffect } from "react"
import { listen } from "@tauri-apps/api/event"
import { useTranslation } from "react-i18next"

export function useTranslateSetup() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Tauri イベントの購読
    const unsubPromise = listen<{ language: string }>("language:update", (e) => {
      i18n.changeLanguage(e.payload.language)
    })

    // クリーンアップ
    return () => {
      unsubPromise.then((unsub) => unsub())
    }
  }, [i18n])
}
