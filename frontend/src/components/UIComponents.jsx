"use client"
import { useState, createContext, useContext } from "react"

const TabsContext = createContext()

export const Card = ({ children, className = "", onClick, ...props }) => (
  <div
    className={`rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-white/20 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/[0.05] ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
)

export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-2 p-8 ${className}`} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, className = "", ...props }) => (
  <h3
    className={`text-2xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent ${className}`}
    {...props}
  >
    {children}
  </h3>
)

export const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-base text-white/60 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
)

export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-8 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

export const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95"

  const variants = {
    default:
      "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 border border-white/10",
    ghost: "hover:bg-white/10 text-white/80 hover:text-white border border-transparent hover:border-white/20",
    secondary:
      "bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500 border border-white/10",
  }

  const sizes = {
    default: "h-12 px-6 py-3",
    sm: "h-10 px-4 py-2 text-sm",
    lg: "h-14 px-8 py-4 text-base",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-12 w-full rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm px-4 py-3 text-base text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${className}`}
    {...props}
  />
)

export const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border border-blue-500/30",
    secondary: "bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-200 border border-gray-500/30",
    destructive: "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-200 border border-red-500/30",
    outline: "text-white/80 border border-white/20 bg-white/5 hover:bg-white/10",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 backdrop-blur-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const Tabs = ({ children, value, onValueChange, className = "", defaultValue, ...props }) => {
  const [internalValue, setInternalValue] = useState(value || defaultValue || "")

  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={`${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({ children, className = "", ...props }) => (
  <div
    className={`inline-flex h-14 items-center justify-center rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-2 text-white/60 shadow-xl ${className}`}
    {...props}
  >
    {children}
  </div>
)

export const TabsTrigger = ({ children, value, className = "", ...props }) => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component")
  }

  const { value: activeValue, onValueChange } = context
  const isActive = activeValue === value

  const handleClick = () => {
    onValueChange(value)
  }

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
          : "hover:bg-white/10 text-white/70 hover:text-white hover:scale-105"
      } ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ children, value, className = "", ...props }) => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component")
  }

  const { value: activeValue } = context

  if (activeValue !== value) return null

  return (
    <div
      className={`mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
