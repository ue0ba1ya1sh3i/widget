import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { getCurrentWindow } from "@tauri-apps/api/window"

const appWindow = getCurrentWindow()

export default function App() {
  const { t } = useTranslation()

  // ウィンドウタイトルの自動変更
  useEffect(() => {
    appWindow.setTitle(
      t("ai.title")
    )
  }, [t])

  return (
    <div className="flex gap-2 p-2 text-gray-900 bg-gray-100 dark:bg-gray-950 dark:text-gray-300 min-h-dvh">
      <p className="text-2xl">{t("settings.load")}</p>
    </div>
  )
}
