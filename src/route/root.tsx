import { getCurrentWindow } from "@tauri-apps/api/window"
import { listen } from "@tauri-apps/api/event"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

// 自作関数
import { getSettingsStore } from "../lib/store"
import { createWindow } from "../lib/window"

// アイコン
import { IoMdClose, IoMdSettings } from "react-icons/io"
import { TbFileAi } from "react-icons/tb"

// Hooksのほうだと作成できないウィンドウのタイトルのためのt
import { t } from "i18next"

const appWindow = getCurrentWindow()

function openSettings() {
  createWindow("Settings", {
    title: t("settings.title"),
    url: "/settings",

    width: 700,
    height: 500,

    resizable: false,
    maximizable: false,
    minimizable: false,
    center: true,
    focus: true,
    decorations: true,
    visible: true
  })
}

function openAI() {
  createWindow("AI", {
    title: t("ai.title"),
    url: "/ai",

    width: 300,
    height: 400,

    decorations: true,
    resizable: false,
    alwaysOnTop: true,
    maximizable: false,
    minimizable: false,
    center: true,
    focus: true,
    visible: true
  })
}

function Clock() {
  const [time, setTime] = useState(new Date())

  //レンダー時に1秒ごとにsetTimeで時間を更新
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // クリーンアップ
    return () => clearInterval(interval)
  }, [])

  // 0を任意でつけて加工
  const hours = String(time.getHours()).padStart(2, "0")
  const minutes = String(time.getMinutes()).padStart(2, "0")

  // 00:00で表示
  return (
    <>{hours}:{minutes}</>
  )
}

function useText() {
  const [text, setText] = useState("")

  useEffect(() => {
    let unsub: (() => void) | null = null

    const loadSavedText = async () => {
      const store = await getSettingsStore()
      const savedText = await store.get<string>("text")
      if (savedText) setText(savedText)
    }

    loadSavedText()

    // テキストの更新
    listen<{ text: string }>("text:update", (e) => {
      setText(e.payload.text)
    }).then((fn) => (unsub = fn))

    // クリーンアップ
    return () => {
      unsub?.()
    }
  }, [])

  return text
}

export default function App() {
  // こっちはhooksから呼んだt (t2)
  const { t: t2 } = useTranslation()
  const text = useText()

  const [color, setColor] = useState("")

  useEffect(() => {
    let unsub: (() => void) | null = null

    const loadSavedColor = async () => {
      const store = await getSettingsStore()
      const savedClass = await store.get<string>("widgetTheme")
      if (savedClass) setColor(savedClass)
    }

    loadSavedColor()

    // テキストの更新
    listen<{ colorClass: string }>("widgetTheme:update", (e) => {
      setColor(e.payload.colorClass)
    }).then((fn) => (unsub = fn))

    // クリーンアップ
    return () => {
      unsub?.()
    }
  }, [])

  return (
    <div className={`flex flex-col gap-2 [-webkit-app-region:drag] p-2 min-h-dvh ${color || "bg-gray-100 text-gray-900"}`}>
      <div className="flex gap-2 ml-auto">
        <TbFileAi size={25} className="hover:bg-gray-300 transition-all cursor-pointer [-webkit-app-region:no-drag] bg-gray-200 text-gray-800 rounded-md p-1" onClick={async () => openAI()} />
        <IoMdSettings size={25} className="hover:bg-gray-300 transition-all cursor-pointer [-webkit-app-region:no-drag] bg-gray-200 text-gray-800 rounded-md p-1" onClick={async () => openSettings()} />
        <IoMdClose size={25} className="hover:bg-gray-300 transition-all cursor-pointer [-webkit-app-region:no-drag] bg-gray-200 text-gray-800 rounded-md p-1" onClick={async () => appWindow.close()} />
      </div>

      <p className="text-5xl text-center"><Clock /></p>
      <p className="text-center text-xl">{text || t2("widget.noText")}</p>
    </div>
  )
}
