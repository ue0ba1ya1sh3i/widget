import { getCurrentWindow } from "@tauri-apps/api/window"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { listen } from "@tauri-apps/api/event"
import { useEffect, useState } from "react"
import { getSettingsStore } from "../lib/store"
import { IoMdClose, IoMdSettings } from "react-icons/io"
import { useTranslation } from "react-i18next"
import { t } from "i18next"

const appWindow = getCurrentWindow()

async function openSettings() {
  const settingsWindow = await WebviewWindow.getByLabel("settings")

  if (settingsWindow) {
    // 既に開かれてるのであればフォーカスを当てる
    await settingsWindow.show()
    await settingsWindow.setFocus()
  } else {
    // 開かれてないので新規作成
    new WebviewWindow("settings", {
      url: "/settings",
      width: 700,
      height: 500,
      title: t("settings.title"),
      resizable: false,
      maximizable: false,
      minimizable: false,
      center: true,
      focus: true,
      decorations: true,
      visible: true
    })
  }
}

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const hours = String(time.getHours()).padStart(2, "0")
  const minutes = String(time.getMinutes()).padStart(2, "0")

  return (
    <>{hours}:{minutes}</>
  )
}

function App() {
  const { t: t2, i18n } = useTranslation()
  const [text, setText] = useState("")

  // 言語変更
  useEffect(() => {
    const unsub = listen<{ language: string }>("language:update", (e) => {
      i18n.changeLanguage(e.payload.language)
    })

    // クリーンアップ
    return () => {
      unsub.then(fn => fn())
    }
  }, [i18n])

  // テキスト設定
  useEffect(() => {
    let unsub: (() => void) | null = null

    // 起動時に保存されている設定を読み込む
    ;(async () => {
      const store = await getSettingsStore()
      const savedText = await store.get<string>("text")
      if (savedText) setText(savedText)
    })()

    // 設定ウィンドウからの更新
    listen<{ text: string }>("text:update", (e) => {
      setText(e.payload.text)
    }).then((fn) => (unsub = fn))

    // クリーンアップ
    return () => {
      if (unsub) unsub()
    }
  }, [])

  return (
    <div className="flex flex-col gap-2 [-webkit-app-region:drag] p-2 bg-gradient-to-tr from-violet-400 to-indigo-400 text-white min-h-dvh">
      <div className="flex gap-2 ml-auto">
        <IoMdSettings size={25} className="hover:bg-gray-300 transition-all cursor-pointer [-webkit-app-region:no-drag] bg-gray-200 text-gray-800 rounded-md p-1" onClick={() => openSettings()} />
        <IoMdClose size={25} className="hover:bg-gray-300 transition-all cursor-pointer [-webkit-app-region:no-drag] bg-gray-200 text-gray-800 rounded-md p-1" onClick={() => appWindow.close()} />
      </div>

      <p className="text-5xl text-center"><Clock /></p>
      <p className="text-center text-xl">{text || t2("widget.noText")}</p>
    </div>
  )
}

export default App
