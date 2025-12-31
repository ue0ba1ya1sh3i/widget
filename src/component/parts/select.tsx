import React from "react"

type SelectInput = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  children: React.ReactNode
}

export const SelectInput: React.FC<SelectInput> = ({
  value,
  onChange,
  className = "",
  children,
}) => {
  return (
    <select value={value} onChange={onChange} className={`dark:bg-gray-800 border-2 dark:border-none bg-white appearance-none w-80 dark:text-white py-1 px-2 rounded-md outline-none ${className}`}>
      {children}
    </select>
  )
}
