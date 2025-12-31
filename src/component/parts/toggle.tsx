import React from "react"

type ToggleSwitch = {
  isOn: boolean
  onChange: (newValue: boolean) => void
  className?: string
}

export const ToggleSwitch: React.FC<ToggleSwitch> = ({ isOn, onChange, className = "" }) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input type="checkbox" checked={isOn} onChange={() => onChange(!isOn)} className="sr-only" />
      <div className={`w-14 h-8 rounded-full transition-colors duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-300"}`}
      ></div>
      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
        isOn ? "translate-x-6" : "translate-x-0"}`}
      ></div>
    </label>
  )
}
