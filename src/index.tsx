import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./route/root"
import "./css/index.css"
import startUp from "./startUp"

startUp()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
