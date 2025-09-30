"use client"

import { FileText, BarChart3, Search, Users, Zap, Shield } from "lucide-react"
import { useEffect } from "react"

const Features = () => {
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .features-animated-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }
      
      .features-grid-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
          linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: gridMove 20s linear infinite;
      }
      
      .features-particles {
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(0, 255, 136, 0.4);
        border-radius: 50%;
        animation: particleFloat 15s infinite linear;
      }
      
      .features-neural-node {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(0, 136, 255, 0.6);
        border-radius: 50%;
        animation: neuralPulse 3s infinite ease-in-out;
      }
      
      @keyframes gridMove {
        0% { transform: translate(0, 0); }
        100% { transform: translate(50px, 50px); }
      }
      
      @keyframes particleFloat {
        0% { transform: translateY(100vh) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
      }
      
      @keyframes neuralPulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const features = [
    {
      icon: <FileText size={32} />,
      title: "Smart Document Processing",
      description: "Transform PDFs, docs, and texts into digestible summaries with advanced AI comprehension.",
      gradient: "from-green-400 to-blue-500",
      image: "/ai-document-processing.png",
      bgPattern: "circuit",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Visual Analytics",
      description: "Generate interactive graphs, charts, and visual representations from complex data sets.",
      gradient: "from-purple-400 to-pink-500",
      image: "/futuristic-data-dashboard.png",
      bgPattern: "data",
    },
    {
      icon: <Search size={32} />,
      title: "Deep Research Engine",
      description: "Conduct comprehensive research across multiple sources with intelligent synthesis.",
      gradient: "from-blue-400 to-cyan-500",
      image: "/csm_news-deep-tech-startups_f6c02238bd.webp",
      bgPattern: "neural",
    },
    {
      icon: <Users size={32} />,
      title: "Personal Recommendations",
      description: "Get tailored insights and suggestions based on your data patterns and preferences.",
      gradient: "from-orange-400 to-red-500",
      image: "/ai-recommendation-system.png",
      bgPattern: "matrix",
    },
    {
      icon: <Zap size={32} />,
      title: "Lightning Fast Processing",
      description: "Experience near-instantaneous analysis with our optimized AI infrastructure.",
      gradient: "from-yellow-400 to-orange-500",
      image: "/ai-quantum-lightning.png",
      bgPattern: "circuit",
    },
    {
      icon: <Shield size={32} />,
      title: "Enterprise Security",
      description: "Your data is protected with military-grade encryption and privacy controls.",
      gradient: "from-indigo-400 to-purple-500",
      image: "/cybersecurity-shield.png",
      bgPattern: "neural",
    },
  ]

  return (
    <section className="py-32 relative" id="features">
      <div className="features-animated-bg">
        <div className="features-grid-bg"></div>
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="features-particles"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
        {/* Neural network nodes */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="features-neural-node"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-900/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Powerful AI Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the cutting-edge capabilities that make DarkCore the ultimate AI platform for intelligent analysis
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl"></div>

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className={`w-full h-full ${
                    feature.bgPattern === "circuit"
                      ? "bg-circuit-pattern"
                      : feature.bgPattern === "neural"
                        ? "bg-neural-pattern"
                        : feature.bgPattern === "data"
                          ? "bg-data-pattern"
                          : "bg-matrix-pattern"
                  }`}
                ></div>
              </div>

              <div className="relative z-10 p-8">
                {/* Feature image */}
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Icon with glow effect */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-transparent"></div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">{feature.description}</p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .bg-circuit-pattern {
          background-image: radial-gradient(circle at 25% 25%, rgba(0,255,136,0.1) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(0,136,255,0.1) 2px, transparent 2px);
          background-size: 30px 30px;
        }
        .bg-neural-pattern {
          background-image: linear-gradient(45deg, rgba(0,255,136,0.05) 25%, transparent 25%),
                           linear-gradient(-45deg, rgba(0,136,255,0.05) 25%, transparent 25%);
          background-size: 20px 20px;
        }
        .bg-data-pattern {
          background-image: repeating-linear-gradient(0deg, rgba(255,0,136,0.05), rgba(255,0,136,0.05) 1px, transparent 1px, transparent 10px);
          background-size: 100% 10px;
        }
        .bg-matrix-pattern {
          background-image: conic-gradient(from 0deg at 50% 50%, rgba(0,255,136,0.05), rgba(0,136,255,0.05), rgba(255,0,136,0.05));
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  )
}

export default Features
