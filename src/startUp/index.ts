// Get all modules in the current directory files
const modules = import.meta.glob("./*.ts", { eager: true })

// Execute modules
for (const path in modules) {
    const mod = modules[path] as { default?: () => void }
    mod.default?.()
}
