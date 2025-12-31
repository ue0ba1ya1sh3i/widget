import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { getSettingsStore } from "../../lib/store"
import { emit } from "@tauri-apps/api/event"

export default function App() {
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState("en")

  // 初期値をストアから読み込む
  useEffect(() => {
    ;(async () => {
      const store = await getSettingsStore()
      
      // なければenにする
      const savedLang = ((await store.get("language")) as string) || "en"
      setLang(savedLang)
    })()
  }, [])

  // 言語変更処理
  const handleChangeLanguage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    // HTMLから取得して言語を変更
    const language = e.target.value
    setLang(language)
    await i18n.changeLanguage(language)

    // ストアに保存
    const store = await getSettingsStore()
    await store.set("language", language)
    await store.save()

    // 他コンポーネントに通知
    emit("language:update", { language: language })
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl">{t("settings.Main.language")}</p>
      <select value={lang} onChange={handleChangeLanguage} className="dark:bg-gray-800 border-2 dark:border-none bg-white appearance-none w-80 dark:text-white py-1 px-2 rounded-md outline-none">
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  )
}
