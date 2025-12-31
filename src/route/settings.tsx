import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { getCurrentWindow } from "@tauri-apps/api/window"

// アイコン
import { FaPalette, FaUser, FaMap, FaInfoCircle } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"

// 設定コンポーネントのインポート
import Main from "../component/settings/main"
import Theme from "../component/settings/theme"
import Personal from "../component/settings/personal"
import Position from "../component/settings/position"
import Info from "../component/settings/info"

const appWindow = getCurrentWindow()

export default function App() {
  const { t } = useTranslation()

  // メニュー定数
  const menus = ["Main", "Theme", "Personal", "Position", "Info"] as const
  type Menus = (typeof menus)[number]
  const [activeMenu, setActiveMenu] = useState<Menus>("Main")

  // ウィンドウタイトルの自動変更
  useEffect(() => {
    appWindow.setTitle(
      `${t("settings.title")} - ${t(`settings.${activeMenu}.title`)}`
    )
  }, [t, activeMenu])

  // コンポーネント定義
  const componentMap: Record<Menus, React.ReactNode> = {
    Main: <Main />,
    Theme: <Theme />,
    Personal: <Personal />,
    Position: <Position />,
    Info: <Info />
  }

  // アイコン定義
  const iconMap: Record<Menus, React.ReactNode> = {
    Main: <IoMdSettings size={15} />,
    Theme: <FaPalette size={15} />,
    Personal: <FaUser size={15} />,
    Position: <FaMap size={15} />,
    Info: <FaInfoCircle size={15} />
  }

  return (
    <div className="flex gap-2 p-2 text-gray-900 bg-gray-100 dark:bg-gray-950 dark:text-gray-300 min-h-dvh">
      <div className="overflow-y-auto w-40 flex-shrink-0 pr-2 flex flex-col gap-2 border-r-2 border-gray-300 dark:border-gray-600 text-lg">
        {menus.map((menu) => (
          <div key={menu} className={`dark:border-gray-600 border-gray-300 pl-1 cursor-pointer border-b-2 ${
            activeMenu === menu ? "bg-gray-300 dark:bg-gray-700" : "" }`}
            onClick={() => setActiveMenu(menu as Menus)}
          >
            <div className="flex gap-2 text-lg items-center">{iconMap[menu]}{t(`settings.${menu}.title`)}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex-col gap-2 flex">
        <p className="text-3xl">{t(`settings.${activeMenu}.title`)}</p>
        <div className="py-2 flex flex-col gap-2">{componentMap[activeMenu]}</div>
      </div>
    </div>
  )
}
