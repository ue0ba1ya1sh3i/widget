import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Setup from "./component/setup"

// セットアップコード
import "./css/index.css"
import "./startUp"

// ルートコンポーネント
import Root from "./route/root"
import Settings from "./route/settings"
import AI from "./route/ai"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Setup>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai" element={<AI />} />
        </Routes>
      </BrowserRouter>
    </Setup>
  </React.StrictMode>
)
