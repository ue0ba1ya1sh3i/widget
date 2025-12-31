import { useTranslation } from "react-i18next"
import { useTheme } from "../../hooks/useTheme"

export default function App() {
  const { t } = useTranslation()
  const { isDark, toggleTheme } = useTheme()

  // 取得できるまで待つ
  if (isDark === null) return null

  return (
    <>
      <div className="flex items-center gap-2">
        <p className="text-2xl">
          {t("settings.Theme.dark")}
        </p>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={isDark} onChange={toggleTheme} className="sr-only" />

          <div className="w-14 h-8 bg-gray-200 dark:bg-green-600 rounded-full transition-all"></div>
          <div className={`absolute left-1 top-1 size-6 bg-white rounded-full shadow-md transform transition-transform ${
            isDark ? "translate-x-6" : "translate-x-0" }`}
          ></div>
        </label>
      </div>
    </>
  )
}
