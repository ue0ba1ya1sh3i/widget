import { emit } from "@tauri-apps/api/event"

// 自作関数
import { getSettingsStore } from "./store"

async function loadTheme(): Promise<boolean> {
  const store = await getSettingsStore()
  const isDark = !!(await store.get("settingsTheme"))

  document.documentElement.classList.toggle("dark", isDark)
  return isDark
}

async function setTheme(isDark: boolean) {
  //設定ファイル
  const store = await getSettingsStore()
  await store.set("settingsTheme", isDark)
  await store.save()

  // テーマとclassNameの同期
  if (isDark) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  // 全ウィンドウに通知
  emit("theme:update", { isDark })
}

export { loadTheme, setTheme }
