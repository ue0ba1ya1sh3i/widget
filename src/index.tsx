import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Setup from "./component/setupI18next"

// CSSとセットアップコードの実行
import "./css/index.css"
import "./startUp"

// ルートコンポーネント
import Root from "./route/root"
import Settings from "./route/settings"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Setup>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </Setup>
  </React.StrictMode>
)
