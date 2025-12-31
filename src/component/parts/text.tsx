import React from "react"

type TextInput = {
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
}

export const TextInput: React.FC<TextInput> = ({
  value = "",
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`dark:bg-gray-800 border-2 bg-white dark:border-none w-80 py-1 px-2 rounded-md outline-none ${className}`}
    />
  )
}
