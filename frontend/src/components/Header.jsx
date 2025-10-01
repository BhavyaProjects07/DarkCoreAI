"use client"

import { useState, useEffect, useRef } from "react"
import { Sun, Moon, User, LogOut, UserPlus, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const Header = ({ theme, toggleTheme, toggleSidebar, isSidebarOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [username, setUsername] = useState(null)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Load username from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("username")
    if (storedName) setUsername(storedName)

    function handleStorageChange() {
      const name = localStorage.getItem("username")
      setUsername(name)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    setUsername(null)
    setIsDropdownOpen(false)
    navigate("/signin")
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">

          {/* ✅ Left section: Logo + Sidebar toggle */}
          <div className="left-section">
            {/* Hamburger for sidebar toggle */}
            <button
              onClick={toggleSidebar}
              className="hamburger-btn"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <>
                  <span className="block w-5 h-0.5 bg-white rounded"></span>
                  <span className="block w-5 h-0.5 bg-white rounded mt-1"></span>
                </>
              )}
            </button>

            {/* Logo + Icon */}
            <div className="logo animate-slide-left">
              <img
                src="/dark_icon2.png"
                alt="DarkCore Icon"
                className="logo-icon"
              />
              <span className="logo-text gradient-text">DarkCore</span>
              <span className="logo-subtitle">AI</span>
            </div>
          </div>

          {/* ✅ Navigation Links */}
          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <a href="/" className="nav-link">Home</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="https://darkai-by-bhavya.vercel.app" className="nav-link" target="_blank" rel="noreferrer">
              Dark AI
            </a>
          </nav>

          {/* ✅ Right actions */}
          <div className="header-actions">
            {username ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Profile"
                >
                  <User size={22} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-2 z-50">
                    <p className="px-4 py-2 text-sm text-gray-300">
                      Welcome, <b>{username?.split("@")[0]}</b>
                    </p>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-800 text-red-400"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signup">
                <button
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Signup"
                >
                  <UserPlus size={22} />
                </button>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : (
                <>
                  <span className="block w-6 h-0.5 bg-white rounded"></span>
                  <span className="block w-6 h-0.5 bg-white rounded mt-1"></span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .left-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .hamburger-btn {
          padding: 0.5rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .hamburger-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-left: 0.5rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        .logo-text {
          font-size: 1.8rem;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        .logo-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 300;
        }

        .nav {
          display: flex;
          gap: 4rem;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: var(--accent-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            flex-direction: column;
            padding: 1rem;
            border-top: 1px solid var(--border-color);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .nav-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .menu-toggle {
            display: block;
          }

          .nav-link {
            padding: 0.5rem 0;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
