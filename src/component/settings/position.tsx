import { useTranslation } from "react-i18next"

export default function App() {
  const { t } = useTranslation()
  return <p className="text-2xl">{t("settings.load")}</p>
}
