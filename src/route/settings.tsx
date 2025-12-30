import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaPalette, FaUser, FaMap } from "react-icons/fa"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { IoMdSettings } from "react-icons/io"

import Main from "../component/settings/main"
import Color from "../component/settings/color"
import Personal from "../component/settings/personal"
import Position from "../component/settings/position"

const appWindow = getCurrentWindow()

function App() {
  const { t } = useTranslation()

  useEffect(() => {
    appWindow.setTitle(t("settings.title"))
  }, [t])

  // メニューの定義
  const menus = ["Main", "Color", "Personal", "Position"] as const
  type Menus = (typeof menus)[number]

  // 初期はメインメニューを表示する
  const [activeMenu, setActiveMenu] = useState<Menus>("Main")

  // メインに表示するコンポーネントを決定
  const renderComponent = () => {
    const componentMap: Record<Menus, React.ReactNode> = {
      Main: <Main />,
      Color: <Color />,
      Personal: <Personal />,
      Position: <Position />
    }

    return componentMap[activeMenu]
  }

  // メニューのアイコンの設定
  const iconMap: Record<Menus, React.ReactNode> = {
    Main: <IoMdSettings size={15} />,
    Color: <FaPalette size={15} />,
    Personal: <FaUser size={15} />,
    Position: <FaMap size={15} />
  }

  return (
    <div className="flex gap-2 p-2 text-black bg-gray-200 dark:bg-gray-950 dark:text-gray-300 min-h-dvh">
      <div className="overflow-y-auto w-40 flex-shrink-0 pr-2 flex flex-col gap-2 border-r-2 border-gray-600 text-lg">
        {menus.map((menu) => (
          <div key={menu} className={`dark:border-gray-600 border-gray-500 pl-1 cursor-pointer border-b-2 ${
            activeMenu === menu ? "bg-gray-300 dark:bg-gray-700" : "" }`}
            onClick={() => setActiveMenu(menu as Menus)}
          >
            <div className="flex gap-2 items-center">
              {iconMap[menu]}
              {t(`settings.${menu.toLowerCase()}.title`)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex-col gap-2 flex">
        <p className="text-3xl">{t(`settings.${activeMenu.toLowerCase()}.title`)}</p>
        <div className="py-2 flex flex-col gap-2">{renderComponent()}</div>
      </div>
    </div>
  )
}

export default App
