"use client"

import { ArrowRight, Zap, Brain, Target } from "lucide-react"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-slide-up">
            <h1 className="hero-title">
              Next-Gen AI for
              <span className="gradient-text"> Intelligent Analysis</span>
            </h1>
            <p className="hero-description">
              Transform complex documents, research, and data into actionable insights with DarkCore's advanced AI
              capabilities. Experience the future of intelligent content processing.
            </p>
            <div className="hero-buttons">
              <Link to="/chat">
                <button className="btn-primary animate-glow">
                  Start Analyzing
                  <ArrowRight size={20} />
                </button>
              </Link>
              <button className="btn-secondary">Watch Demo</button>
            </div>
          </div>

          <div className="hero-visual animate-slide-right">
            <div className="ai-core animate-float">
              <div className="core-ring ring-1"></div>
              <div className="core-ring ring-2"></div>
              <div className="core-ring ring-3"></div>
              <div className="core-center">
                <Brain size={40} className="gradient-text" />
              </div>
            </div>

            <div className="floating-elements">
              <div className="element element-1">
                <Zap size={24} />
              </div>
              <div className="element element-2">
                <Target size={24} />
              </div>
              <div className="element element-3">
                <Brain size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 80px 1rem 2rem 1rem;
          position: relative;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 0 1rem;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: var(--gradient-primary);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          min-width: 160px;
          justify-content: center;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border: 2px solid var(--border-color);
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          min-width: 140px;
        }

        .btn-secondary:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 500px;
        }

        .ai-core {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .core-ring {
          position: absolute;
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          opacity: 0.3;
        }

        .ring-1 {
          width: 100%;
          height: 100%;
          animation: spin 20s linear infinite;
        }

        .ring-2 {
          width: 150%;
          height: 150%;
          animation: spin 15s linear infinite reverse;
          border-color: var(--accent-secondary);
        }

        .ring-3 {
          width: 200%;
          height: 200%;
          animation: spin 25s linear infinite;
          border-color: var(--accent-tertiary);
        }

        .core-center {
          background: var(--bg-secondary);
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-glow);
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .element {
          position: absolute;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1rem;
          color: var(--accent-primary);
          animation: float 4s ease-in-out infinite;
        }

        .element-1 {
          top: 10%;
          right: 20%;
          animation-delay: 0s;
        }

        .element-2 {
          bottom: 20%;
          left: 10%;
          animation-delay: 1s;
        }

        .element-3 {
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Enhanced responsive design with multiple breakpoints and better spacing */
        
        /* Large tablets and small desktops */
        @media (max-width: 1024px) {
          .hero {
            padding: 60px 1rem 2rem 1rem;
          }
          
          .hero-content {
            gap: 3rem;
          }
          
          .hero-title {
            font-size: 3rem;
          }
          
          .hero-visual {
            height: 400px;
          }
          
          .ai-core {
            width: 180px;
            height: 180px;
          }
        }

        /* Tablets */
        @media (max-width: 768px) {
          .hero {
            padding: 40px 1rem 2rem 1rem;
            min-height: auto;
          }
          
          .container {
            padding: 0 0.5rem;
          }
          
          .hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .hero-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          
          .hero-description {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
          }

          .hero-visual {
            height: 300px;
            order: -1;
          }

          .ai-core {
            width: 150px;
            height: 150px;
          }
          
          .core-center {
            width: 60px;
            height: 60px;
          }
          
          .core-center svg {
            width: 30px;
            height: 30px;
          }
          
          .element {
            padding: 0.75rem;
          }
          
          .element svg {
            width: 20px;
            height: 20px;
          }
        }

        /* Large mobile phones */
        @media (max-width: 480px) {
          .hero {
            padding: 20px 0.75rem 1.5rem 0.75rem;
          }
          
          .container {
            padding: 0 0.25rem;
          }
          
          .hero-content {
            gap: 1.5rem;
          }

          .hero-title {
            font-size: 2rem;
            line-height: 1.3;
            margin-bottom: 0.75rem;
          }
          
          .hero-description {
            font-size: 1rem;
            margin-bottom: 1.25rem;
            padding: 0 0.5rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            width: 100%;
          }
          
          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 280px;
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
            justify-content: center;
          }

          .hero-visual {
            height: 250px;
            margin: 0 auto;
          }

          .ai-core {
            width: 120px;
            height: 120px;
          }
          
          .core-center {
            width: 50px;
            height: 50px;
          }
          
          .core-center svg {
            width: 24px;
            height: 24px;
          }
          
          .element {
            padding: 0.5rem;
          }
          
          .element svg {
            width: 16px;
            height: 16px;
          }
        }

        /* Small mobile phones */
        @media (max-width: 360px) {
          .hero {
            padding: 15px 0.5rem 1rem 0.5rem;
          }
          
          .hero-title {
            font-size: 1.75rem;
          }
          
          .hero-description {
            font-size: 0.95rem;
            padding: 0;
          }
          
          .hero-visual {
            height: 200px;
          }
          
          .ai-core {
            width: 100px;
            height: 100px;
          }
          
          .core-center {
            width: 40px;
            height: 40px;
          }
          
          .core-center svg {
            width: 20px;
            height: 20px;
          }
          
          .btn-primary,
          .btn-secondary {
            padding: 0.75rem 1.25rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
