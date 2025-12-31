import { useTranslation } from "react-i18next"
import { useState, useRef, useEffect } from "react"
import { emit } from "@tauri-apps/api/event"

// 自作関数
import { getSettingsStore } from "../../lib/store"

// 自作パーツ
import { TextInput } from "../parts/text"

export default function App() {
  const { t } = useTranslation()
  const [text, setText] = useState("")

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setText(value)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      const store = await getSettingsStore()
      await store.set("text", value)
      await store.save()
      emit("text:update", { text: value })
    }, 1000)
  }

  // レンダー時に保存されている設定を読み込む
  useEffect(() => {
    ;(async () => {
      const store = await getSettingsStore()
      const savedText = await store.get<string>("text")
      if (savedText) setText(savedText)
    })()
  }, [])

  return (
    <>
      <p className="text-2xl">{t("settings.Personal.text")}</p>
      <div className="flex gap-4">
        <TextInput
          value={text}
          onChange={handleChangeText}
          placeholder="Enter here"
        />
      </div>
    </>
  )
}
