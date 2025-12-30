import { useTranslation } from "react-i18next"
import { useState } from "react"
import { emit } from "@tauri-apps/api/event"
import { getSettingsStore } from "../../lib/store"
import { useRef } from "react"

function Personal() {
  const { t } = useTranslation()
  const [textValue, setTextValue] = useState("")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTextValue(value)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      const store = await getSettingsStore()
      await store.set("text", value)
      await store.save()
      emit("text:update", { text: value })
    }, 500)
  }

  return (
    <>
      <p className="text-xl">{t("settings.personal.text")}</p>
      <div className="flex gap-2">
        <input
          placeholder="Enter here"
          className="dark:bg-gray-800 bg-gray-100 w-80 py-1 px-2 rounded-md outline-none"
          type="text"
          value={textValue}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default Personal
