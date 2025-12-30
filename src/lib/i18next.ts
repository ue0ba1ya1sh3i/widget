import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import { getSettingsStore } from "../lib/store"

// 翻訳データ
import en from "../translate/data/en.json"
import ja from "../translate/data/ja.json"

async function initI18next() {
  const store = await getSettingsStore()
  const savedLang = (await store.get("language")) as string | undefined

  await i18next
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ja: { translation: ja }
      },

      lng: savedLang || "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false }
    })

  return i18next
}

export default initI18next
