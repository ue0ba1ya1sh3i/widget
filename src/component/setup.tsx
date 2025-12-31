// 自作hooks
import { useThemeSetup } from "../hooks/useThemeSetup"
import { useTranslateSetup } from "../hooks/useTranslateSetup"

// ここでは初期化するhooksを実行する場～
function App({ children }: { children: React.ReactNode }) {
  // 自作hooksの実行
  useThemeSetup()
  useTranslateSetup()

  return <>{children}</>
}

export default App
