import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaPalette, FaUser, FaMap, FaInfoCircle } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { getSettingsStore } from "../lib/store"

// 設定コンポーネントのインポート
import Main from "../component/settings/main"
import Color from "../component/settings/theme"
import Personal from "../component/settings/personal"
import Position from "../component/settings/position"
import Info from "../component/settings/info"

const appWindow = getCurrentWindow()

function App() {
  const { t } = useTranslation()
  const [isDark, setIsDark] = useState<boolean | null>(null)

  // 初回レンダー時にストアから取得
  useEffect(() => {
    const loadSetting = async () => {
      const store = await getSettingsStore()
      const darkMode = await store.get("settingsTheme")
      setIsDark(!!darkMode)
      if (darkMode) document.documentElement.classList.add("dark")
    }

    loadSetting()
  }, [])

  // isDarkが変わったらbodyタグのクラスとストアを更新
  useEffect(() => {
    // 読み込み中
    if (isDark === null) return

    const saveSetting = async () => {
      const store = await getSettingsStore()
      await store.set("settingsTheme", isDark)
      await store.save()
    }

    //変更の適用
    if (isDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")

    //isDarkが変わるたびに設定を保存
    saveSetting()
  }, [isDark])

  // メニュー定数
  const menus = ["Main", "Theme", "Personal", "Position", "Info"] as const
  type Menus = (typeof menus)[number]
  const [activeMenu, setActiveMenu] = useState<Menus>("Main")

  // ウィンドウタイトルの自動変更
  useEffect(() => {
    appWindow.setTitle(
      `${t("settings.title")} - ${t(`settings.${activeMenu.toLowerCase()}.title`)}`
    )
  }, [t, activeMenu])

  // コンポーネント描画関数
  const renderComponent = () => {
    // コンポーネント定義
    const componentMap: Record<Menus, React.ReactNode> = {
      Main: <Main />,
      Theme: <Color isDark={isDark as boolean} setIsDark={setIsDark as React.Dispatch<React.SetStateAction<boolean>>} />, // Props で渡す
      Personal: <Personal />,
      Position: <Position />,
      Info: <Info />
    }

    return componentMap[activeMenu]
  }

  // アイコン定義
  const iconMap: Record<Menus, React.ReactNode> = {
    Main: <IoMdSettings size={15} />,
    Theme: <FaPalette size={15} />,
    Personal: <FaUser size={15} />,
    Position: <FaMap size={15} />,
    Info: <FaInfoCircle size={15} />
  }

  //読み込み中
  if (isDark === null) return null

  return (
    <div className="flex gap-2 p-2 text-gray-900 bg-gray-100 dark:bg-gray-950 dark:text-gray-300 min-h-dvh">
      <div className="overflow-y-auto w-40 flex-shrink-0 pr-2 flex flex-col gap-2 border-r-2 border-gray-300 dark:border-gray-600 text-lg">
        {menus.map((menu) => (
          <div
            key={menu}
            className={`dark:border-gray-600 border-gray-300 pl-1 cursor-pointer border-b-2 ${
              activeMenu === menu ? "bg-gray-300 dark:bg-gray-700" : ""
            }`}
            onClick={() => setActiveMenu(menu as Menus)}
          >
            <div className="flex gap-2 items-center">{iconMap[menu]}{t(`settings.${menu.toLowerCase()}.title`)}</div>
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
