import { emit } from "@tauri-apps/api/event"
import { getSettingsStore } from "../lib/store"
import { useRef } from "react"

// 自分のテキストを設定する
async function updateText(text: string) {
  const store = await getSettingsStore()

  await store.set("text", text)
  await store.save()

  // テキスト更新イベントを送信する
  emit("text:update", { text })
}

function App() {
  const text = useRef<HTMLInputElement>(null);

	return (
    <div className="flex flex-col gap-3 p-2 bg-gradient-to-tr from-violet-400 to-indigo-400 text-white min-h-dvh">
      <p>This is settings page!</p>
      <input className="text-black" type="text" ref={text} />
      <button onClick={() => updateText(text.current?.value || "")}>Set text</button>
    </div>
  )
}

export default App
