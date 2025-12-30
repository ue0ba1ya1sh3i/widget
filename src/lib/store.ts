import { Store } from "@tauri-apps/plugin-store"

// キャッシュ変数
let store: Store | null = null

export async function getSettingsStore() {
  // キャッシュがなければ読み込む
  if (!store) {
    store = await Store.load("settings.json")
  }

  // キャッシュを返す
  return store
}
