"use client"

const TailwindAndAnimations = () => {
  if (typeof document !== "undefined" && !document.getElementById("tailwind-cdn")) {
    const tailwindLink = document.createElement("link")
    tailwindLink.id = "tailwind-cdn"
    tailwindLink.href = "https://cdn.tailwindcss.com"
    tailwindLink.rel = "stylesheet"
    document.head.appendChild(tailwindLink)

    const style = document.createElement("style")
    style.id = "custom-animations"
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
      @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .animate-slide-up {
        animation: slideUp 0.8s ease-out forwards;
      }
      .animate-fade-in {
        animation: fadeIn 1s ease-out forwards;
      }
      .animate-pulse-slow {
        animation: pulse 3s ease-in-out infinite;
      }
      .floating-element {
        animation: float var(--duration, 25s) var(--delay, 0s) infinite ease-in-out alternate, glow 4s ease-in-out infinite alternate;
      }
      .grid-animation {
        animation: gridMove 20s linear infinite;
      }
      .particle-animation {
        animation: particle var(--duration, 10s) linear infinite;
        animation-delay: var(--delay, 0s);
      }
    `
    document.head.appendChild(style)
  }
  return null
}

export default TailwindAndAnimations
