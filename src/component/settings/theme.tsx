import { useTranslation } from "react-i18next"
import { useTheme } from "../../hooks/useTheme"

// 自作関数
import { setWidgetTheme } from "../../lib/theme"

// 自作パーツ
import { ToggleSwitch } from "../parts/toggle"

// ウィジェットテーマカラーの定義
const widgetColor = [
  "bg-red-300 text-white",
  "bg-blue-400 text-white",
  "bg-purple-400 text-white",
  "bg-gradient-to-tr from-violet-400 to-indigo-400 text-white",
  "bg-yellow-300 text-gray-900",
  "bg-gray-100 text-gray-900"
]

export default function App() {
  const { t } = useTranslation()
  const { isDark, toggleTheme } = useTheme()

  // 取得できるまで待つ
  if (isDark === null) return null

  return (
    <>
      <div className="flex items-center gap-4">
        <p className="text-2xl">
          {t("settings.Theme.dark")}
        </p>

        <ToggleSwitch isOn={isDark} onChange={() => toggleTheme()} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-2xl">ウィジェットテーマ</p>
        <div className="flex flex-wrap gap-2">
          {widgetColor.map((colorClass) => (
            <div key={colorClass} className={`size-16 rounded-full cursor-pointer ${colorClass}`} onClick={() => setWidgetTheme(colorClass)}></div>
          ))}
        </div>
      </div>
    </>
  )
}
