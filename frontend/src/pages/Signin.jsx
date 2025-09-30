"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"   // ✅ Import GoogleLogin



function Signin() {
  const BASE_URL = import.meta.env.VITE_BASIC_URL
  const [theme, setTheme] = useState("dark")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    document.body.setAttribute("data-theme", theme)
    document.documentElement.classList.add("dark")
  }, [theme])

  const floatingMaterials = [
    { size: "w-32 h-32", shape: "rounded-lg", position: "top-10 left-5", delay: "0s", duration: "25s", type: "neural" },
    { size: "w-24 h-24", shape: "rounded-full", position: "top-32 right-10", delay: "3s", duration: "30s", type: "circuit" },
    { size: "w-20 h-20", shape: "rotate-45", position: "top-56 left-1/4", delay: "6s", duration: "22s", type: "data" },
    { size: "w-28 h-28", shape: "rounded-lg rotate-12", position: "top-20 right-1/3", delay: "2s", duration: "28s", type: "neural" },
    { size: "w-36 h-36", shape: "rounded-2xl", position: "top-72 left-1/2", delay: "4s", duration: "35s", type: "matrix" },
    { size: "w-16 h-16", shape: "rounded-full", position: "top-96 right-8", delay: "7s", duration: "20s", type: "circuit" },
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${BASE_URL}auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("username", data.username || "Google User");
        localStorage.setItem("token", data.token)
        
        navigate("/") // ✅ Redirect to home
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch (err) {
      setError("Something went wrong. Try again later.")
    }
    setLoading(false)
  }

  // ✅ Handle Google signin
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${BASE_URL}auth/google-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || "Google sign-in failed")
        return
      }
      localStorage.setItem("token", data.token)
      console.log("Signin response:", data)
      localStorage.setItem("username", data.username)
      navigate("/chat") // ✅ Redirect to home
    } catch (err) {
      console.error("Google sign-in error:", err)
      setError("Something went wrong with Google sign-in.")
    }
  }

  const handleGoogleError = () => {
    setError("Google sign-in failed. Please try again.")
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative flex items-center justify-center">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-95"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-green-900/20"></div>

        {/* Animated grids + particles */}
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

        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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
      </div>

      {/* Auth box */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8">
        <div className="backdrop-blur-xl bg-gray-900/30 border border-green-500/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your DarkCore account</p>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-600 text-green-500 focus:ring-green-500/20" />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-400 hover:text-green-300 transition-colors duration-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900/30 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* ✅ Google Login Button */}
            <div className="mt-4 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
              />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin
