import { useEffect, useState } from "react"
import initI18next from "../settings/i18next"
import { I18nextProvider } from "react-i18next"

function App({ children }: { children: React.ReactNode }) {
  const [i18next, setI18next] = useState<any>(null)

  // i18nextの初期化
  useEffect(() => {
    (async () => {
      const i18nInstance = await initI18next()
      setI18next(i18nInstance)
    })()
  }, [])

  // i18nextの初期化が完了していない場合は何も表示しない
  if (!i18next) return null

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export default App
