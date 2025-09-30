"use client"

const FloatingBackground = () => {
  const floatingMaterials = [
    { size: "w-32 h-32", shape: "rounded-lg", position: "top-10 left-5", delay: "0s", duration: "25s", type: "neural" },
    {
      size: "w-24 h-24",
      shape: "rounded-full",
      position: "top-32 right-10",
      delay: "3s",
      duration: "30s",
      type: "circuit",
    },
    { size: "w-20 h-20", shape: "rotate-45", position: "top-56 left-1/4", delay: "6s", duration: "22s", type: "data" },
    {
      size: "w-28 h-28",
      shape: "rounded-lg rotate-12",
      position: "top-20 right-1/3",
      delay: "2s",
      duration: "28s",
      type: "neural",
    },
    {
      size: "w-36 h-36",
      shape: "rounded-2xl",
      position: "top-72 left-1/2",
      delay: "4s",
      duration: "35s",
      type: "matrix",
    },
    {
      size: "w-24 h-24",
      shape: "rounded-full",
      position: "top-96 right-8",
      delay: "7s",
      duration: "20s",
      type: "circuit",
    },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-95"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-green-900/20"></div>

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 grid-animation"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {floatingMaterials.map((material, index) => (
        <div
          key={index}
          className={`absolute ${material.size} ${material.shape} ${material.position} opacity-20 backdrop-blur-sm border transition-all duration-1000 floating-element`}
          style={{
            "--delay": material.delay,
            "--duration": material.duration,
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

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60 particle-animation"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: i % 3 === 0 ? "#00ff88" : i % 3 === 1 ? "#0088ff" : "#ff0088",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              "--duration": `${5 + Math.random() * 10}s`,
              "--delay": `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient light effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>
  )
}

export default FloatingBackground
