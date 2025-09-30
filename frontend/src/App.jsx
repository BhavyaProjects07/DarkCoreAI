"use client"
import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Stats from "./components/Stats"
import Footer from "./components/Footer"

function App() {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    document.body.setAttribute("data-theme", theme)

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const floatingMaterials = [
    { size: "w-40 h-40", shape: "rounded-lg", position: "top-10 left-5", delay: "0s", duration: "25s", type: "neural" },
    {
      size: "w-32 h-32",
      shape: "rounded-full",
      position: "top-32 right-10",
      delay: "3s",
      duration: "30s",
      type: "circuit",
    },
    { size: "w-24 h-24", shape: "rotate-45", position: "top-56 left-1/4", delay: "6s", duration: "22s", type: "data" },
    {
      size: "w-36 h-36",
      shape: "rounded-lg rotate-12",
      position: "top-20 right-1/3",
      delay: "2s",
      duration: "28s",
      type: "neural",
    },
    {
      size: "w-48 h-48",
      shape: "rounded-2xl",
      position: "top-72 left-1/2",
      delay: "4s",
      duration: "35s",
      type: "matrix",
    },
    {
      size: "w-28 h-28",
      shape: "rounded-full",
      position: "top-96 right-8",
      delay: "7s",
      duration: "20s",
      type: "circuit",
    },
    { size: "w-20 h-20", shape: "rotate-45", position: "top-44 left-3/4", delay: "5s", duration: "26s", type: "data" },
    {
      size: "w-44 h-44",
      shape: "rounded-lg rotate-45",
      position: "top-64 right-1/4",
      delay: "1s",
      duration: "32s",
      type: "neural",
    },
    {
      size: "w-16 h-16",
      shape: "rounded-full",
      position: "top-40 left-12",
      delay: "8s",
      duration: "18s",
      type: "circuit",
    },
    {
      size: "w-52 h-52",
      shape: "rounded-xl",
      position: "top-80 right-12",
      delay: "3.5s",
      duration: "38s",
      type: "matrix",
    },
  ]

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg) scale(1); }
        100% { transform: translateY(-30px) rotate(10deg) scale(1.05); }
      }
      @keyframes glow {
        0% { box-shadow: 0 0 20px rgba(0,255,136,0.1); }
        100% { box-shadow: 0 0 40px rgba(0,255,136,0.3), 0 0 60px rgba(0,136,255,0.2); }
      }
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
      @keyframes particle {
        0% { transform: translateY(100vh) scale(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) scale(1); opacity: 0; }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans overflow-hidden relative ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dark gradient overlay with more depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-green-900/20"></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "gridMove 20s linear infinite",
            }}
          ></div>
        </div>

        {/* Additional animated grid layer */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,136,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,136,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
              animation: "gridMove 30s linear infinite reverse",
            }}
          ></div>
        </div>

        {/* Floating neural network nodes */}
        {floatingMaterials.map((material, index) => (
          <div
            key={index}
            className={`absolute ${material.size} ${material.shape} ${material.position} opacity-20 backdrop-blur-sm border transition-all duration-1000`}
            style={{
              animationDelay: material.delay,
              animationDuration: material.duration,
              animation: `float ${material.duration} ${material.delay} infinite ease-in-out alternate, glow 4s ease-in-out infinite alternate`,
              background:
                material.type === "neural"
                  ? "radial-gradient(circle, rgba(0,255,136,0.15), rgba(0,136,255,0.1))"
                  : material.type === "circuit"
                    ? "linear-gradient(45deg, rgba(255,0,136,0.1), rgba(136,0,255,0.15))"
                    : material.type === "matrix"
                      ? "conic-gradient(from 0deg, rgba(0,255,136,0.1), rgba(0,136,255,0.1), rgba(255,0,136,0.1))"
                      : "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,136,255,0.1))",
              backdropFilter: "blur(15px)",
              borderColor:
                material.type === "neural"
                  ? "rgba(0,255,136,0.3)"
                  : material.type === "circuit"
                    ? "rgba(255,0,136,0.3)"
                    : "rgba(0,136,255,0.3)",
              boxShadow: `0 0 30px ${
                material.type === "neural"
                  ? "rgba(0,255,136,0.2)"
                  : material.type === "circuit"
                    ? "rgba(255,0,136,0.2)"
                    : "rgba(0,136,255,0.2)"
              }`,
            }}
          />
        ))}

        {/* Enhanced particle effects */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-60"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                backgroundColor: i % 3 === 0 ? "#00ff88" : i % 3 === 1 ? "#0088ff" : "#ff0088",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Ambient light effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Hero />
        <Features />
        <Stats />
        <Footer />
      </div>
    </div>
  )
}

export default App
