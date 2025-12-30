import React, { useState } from "react"
import { emit } from "@tauri-apps/api/event"
import { getSettingsStore } from "../lib/store"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { FaPalette, FaUser, FaMap } from "react-icons/fa"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { t } from "i18next"
import { IoMdSettings } from "react-icons/io"

const appWindow = getCurrentWindow()

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

function Color() {
  return <p className="text-xl">{t("settings.load")}</p>
}

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

function Position() {
  return <p className="text-xl">{t("settings.load")}</p>
}

function App() {
  const { t } = useTranslation()

  useEffect(() => {
    appWindow.setTitle(t("settings.title"))
  }, [t])

  // メニューの定義
  const menus = ["Main", "Color", "Personal", "Position"] as const
  type Menus = (typeof menus)[number]

  // 初期はメインメニューを表示する
  const [activeMenu, setActiveMenu] = useState<Menus>("Main")

  // メインに表示するコンポーネントを決定
  const renderComponent = () => {
    const componentMap: Record<Menus, React.ReactNode> = {
      Main: <Main />,
      Color: <Color />,
      Personal: <Personal />,
      Position: <Position />
    }

    return componentMap[activeMenu]
  }

  // メニューのアイコンの設定
  const menuIcons: Record<Menus, React.ReactNode> = {
    Main: <IoMdSettings size={15} />,
    Color: <FaPalette size={15} />,
    Personal: <FaUser size={15} />,
    Position: <FaMap size={15} />
  }

  return (
    <div className="flex gap-2 p-2 text-black bg-gray-200 dark:bg-gray-950 dark:text-gray-300 min-h-dvh">
      <div className="overflow-y-auto w-40 flex-shrink-0 pr-2 flex flex-col gap-2 border-r-2 border-gray-600 text-lg">
        {menus.map((menu) => (
          <div key={menu} className={`dark:border-gray-600 border-gray-500 pl-1 cursor-pointer border-b-2 ${
            activeMenu === menu ? "bg-gray-300 dark:bg-gray-700" : "" }`}
            onClick={() => setActiveMenu(menu as Menus)}
          >
            <div className="flex gap-2 items-center">
              {menuIcons[menu]}
              {t(`settings.${menu.toLowerCase()}.title`)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex-col gap-2 flex">
        <p className="text-3xl">{t(`settings.${activeMenu.toLowerCase()}.title`)}</p>
        <div className="py-2 flex flex-col gap-2">{renderComponent()}</div>
      </div>
    </div>
  )
}

export default App
