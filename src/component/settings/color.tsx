import { useTranslation } from "react-i18next"

function Color() {
  const { t } = useTranslation()
  return <p className="text-xl">{t("settings.load")}</p>
}

export default Color
