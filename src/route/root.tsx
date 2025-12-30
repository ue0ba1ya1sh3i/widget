import { getCurrentWindow } from "@tauri-apps/api/window"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { listen } from "@tauri-apps/api/event"
import { useEffect, useState } from "react"
import { getSettingsStore } from "../lib/store"

const appWindow = getCurrentWindow()

const openSettings = async () => {
  console.log("openSettings called")

  const win = await WebviewWindow.getByLabel("settings")
  console.log("settings window:", win)

  if (win) {
    await win.show()
    await win.setFocus()
  } else {
    const newWin = new WebviewWindow("settings", {
      url: "/settings",
      width: 500,
      height: 600,
      title: "Settings",
      resizable: false,
    })

    newWin.once("tauri://created", () => {
      console.log("settings window created")
    })

    newWin.once("tauri://error", (e) => {
      console.error("failed to create settings window", e)
    })
  }
}

function App() {
  const [text, setText] = useState("")

  useEffect(() => {
    let unsub: (() => void) | null = null

    // 1️⃣ 起動時に store から読み込む
    ;(async () => {
      const store = await getSettingsStore()
      const savedText = await store.get<string>("text")
      if (savedText) setText(savedText)
    })()

    // 2️⃣ emit による即時反映
    listen<{ text: string }>("text:update", (e) => {
      setText(e.payload.text)
    }).then((fn) => (unsub = fn))

    // クリーンアップ
    return () => {
      if (unsub) unsub()
    }
  }, [])

  return (
    <div className="flex flex-col gap-3 [-webkit-app-region:drag] p-2 bg-gradient-to-tr from-violet-400 to-indigo-400 text-white min-h-dvh">
      <p>today is {new Date().toLocaleDateString()}!</p>
      <p>{text}</p>
      <button className="[-webkit-app-region:no-drag] bg-gray-200 text-gray-800 rounded-md p-1" onClick={() => appWindow.close()}>Close</button>
      <button className="[-webkit-app-region:no-drag] bg-gray-200 text-gray-800 rounded-md p-1" onClick={() => openSettings()}>Settings</button>
    </div>
  )
}

export default App
