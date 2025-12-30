import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { getSettingsStore } from "../../lib/store"
import { emit } from "@tauri-apps/api/event"

function Main() {
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState("en")

  // 初期値をストアから読み込む
  useEffect(() => {
    ;(async () => {
      const store = await getSettingsStore()
      const savedLang = ((await store.get("language")) as string) || "en"
      setLang(savedLang)
      i18n.changeLanguage(savedLang)
    })()
  }, [])

  // 言語変更処理
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value
    setLang(newLang)
    await i18n.changeLanguage(newLang)
    console.log("runnning!!!")

    // ストアに保存
    const store = await getSettingsStore()
    await store.set("language", newLang)
    await store.save()

    // 他コンポーネントに通知
    emit("language:update", { language: newLang })
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl">{t("settings.main.language")}</p>
      <select value={lang} onChange={handleChange} className="dark:bg-gray-800 bg-gray-100 appearance-none w-80 dark:text-white py-1 px-2 rounded-md outline-none">
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  )
}

export default Main
