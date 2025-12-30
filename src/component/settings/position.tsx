import { useTranslation } from "react-i18next"

function Position() {
  const { t } = useTranslation()
  return <p className="text-xl">{t("settings.load")}</p>
}

export default Position
