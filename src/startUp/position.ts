import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window'

async function setPosition() {
  const win = getCurrentWindow()
  
  // Widgetウィンドウ以外は処理しない
  if (win.label !== "Widget") return

  const size = await win.innerSize()

  // ブラウザ側で画面サイズをはかる
  const screenW = window.screen.availWidth
  const screenH = window.screen.availHeight

  // 右下の位置を計算
  const x = screenW - size.width + 85
  const y = screenH - size.height + 65
  
  await win.setPosition(new LogicalPosition(x, y))
}

setPosition()
