// すべてのモジュールのインポート
const modules = import.meta.glob("./*.ts", { eager: true })

// 各モジュールのコードを実行
for (const path in modules) {
    const mod = modules[path] as { default?: () => void }
    mod.default?.()
}

// i18nextの初期化
import "../lib/i18next"
