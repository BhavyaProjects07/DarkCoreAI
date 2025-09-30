"use client"

import { TrendingUp, Users, FileCheck, Clock } from "lucide-react"
import { useEffect } from "react"

const Stats = () => {
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .stats-animated-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }
      
      .stats-grid-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
          linear-gradient(rgba(0, 136, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 136, 255, 0.04) 1px, transparent 1px);
        background-size: 40px 40px;
        animation: statsGridMove 25s linear infinite;
      }
      
      .stats-particles {
        position: absolute;
        width: 1.5px;
        height: 1.5px;
        background: rgba(0, 136, 255, 0.5);
        border-radius: 50%;
        animation: statsParticleFloat 18s infinite linear;
      }
      
      .stats-neural-node {
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(255, 0, 136, 0.7);
        border-radius: 50%;
        animation: statsNeuralPulse 4s infinite ease-in-out;
      }
      
      @keyframes statsGridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(40px, 40px); }
      }
      
      @keyframes statsParticleFloat {
        0% { transform: translateY(100vh) translateX(-50px); opacity: 0; }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
      }
      
      @keyframes statsNeuralPulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 1; transform: scale(2); }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const stats = [
    {
      icon: <FileCheck size={32} />,
      number: "10M+",
      label: "Documents Processed",
      description: "PDFs, docs, and texts analyzed",
    },
    {
      icon: <Users size={32} />,
      number: "50K+",
      label: "Active Users",
      description: "Researchers and professionals",
    },
    {
      icon: <TrendingUp size={32} />,
      number: "99.9%",
      label: "Accuracy Rate",
      description: "In content summarization",
    },
    {
      icon: <Clock size={32} />,
      number: "2.3s",
      label: "Average Processing",
      description: "Lightning-fast analysis",
    },
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="stats-animated-bg">
        <div className="stats-grid-bg"></div>
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`stats-particle-${i}`}
            className="stats-particles"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 18}s`,
              animationDuration: `${18 + Math.random() * 8}s`,
            }}
          />
        ))}
        {/* Neural network nodes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`stats-node-${i}`}
            className="stats-neural-node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-pulse">
          <h2 className="text-5xl font-bold mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the growing community of professionals who rely on DarkCore AI
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-900 border border-gray-800 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/20 relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:left-[100%] transition-all duration-500"></div>

              <div className="text-green-400 mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-5xl font-bold font-mono mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
