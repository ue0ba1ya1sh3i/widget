import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
import { emit } from "@tauri-apps/api/event"
import { getSettingsStore } from "../../lib/store"

function Personal() {
  const { t } = useTranslation()
  const [text, setText] = useState("")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // input変更時の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setText(value)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      const store = await getSettingsStore()
      await store.set("text", value)
      await store.save()
      emit("text:update", { text: value })
    }, 500)
  }

  // 起動時に保存されている設定を読み込む
  useEffect(() => {
    ;(async () => {
      const store = await getSettingsStore()
      const savedText = await store.get<string>("text")
      if (savedText) setText(savedText)
    })()
  }, [])

  return (
    <>
      <p className="text-xl">{t("settings.personal.text")}</p>
      <div className="flex gap-2">
        <input
          placeholder="Enter here"
          className="dark:bg-gray-800 border-2 bg-white dark:border-none w-80 py-1 px-2 rounded-md outline-none"
          type="text"
          value={text}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default Personal
