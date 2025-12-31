import { useTranslation } from "react-i18next"

// dark変数の型定義
type Color = {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

function Color({ isDark, setIsDark }: Color) {
  const { t } = useTranslation()

  return (
    <>
      <p className="text-xl">
        {t("settings.theme.current", { mode: isDark ? t("settings.theme.dark") : t("settings.theme.light") })}
      </p>

      <button
        className="border-2 dark:border-none px-4 py-2 w-fit rounded bg-white dark:bg-gray-800"
        onClick={() => setIsDark(prev => !prev)}
      >
        {isDark ? t("settings.theme.button.toLight") : t("settings.theme.button.toDark")}
      </button>
    </>
  )
}

export default Color
