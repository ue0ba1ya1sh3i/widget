import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

// Tauriのウィンドウ設定の型
type WindowSettings = {
  [key: string]: string | number | boolean | undefined
}

//ウィンドウの作成関数
async function createWindow(
  name: string,
  data: WindowSettings = {}
) {
  const window = await WebviewWindow.getByLabel(name)

  // 既にあるならフォーカスし、ないなら作る
  if (window) {
    await window.show()
    await window.setFocus()
  } else {
    new WebviewWindow(name, data)
  }
}

export { createWindow }
