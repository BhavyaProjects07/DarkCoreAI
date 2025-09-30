"use client"

import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text gradient-text">DarkCore</span>
              <span className="logo-subtitle">AI</span>
            </div>
            <p className="brand-description">
              Empowering the future with intelligent AI solutions for document processing, research, and data analysis.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Github size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4 className="link-title">Product</h4>
              <a href="#" className="footer-link">
                Features
              </a>
              <a href="#" className="footer-link">
                Pricing
              </a>
              <a href="#" className="footer-link">
                API
              </a>
              <a href="#" className="footer-link">
                Documentation
              </a>
            </div>

            <div className="link-group">
              <h4 className="link-title">Company</h4>
              <a href="#" className="footer-link">
                About
              </a>
              <a href="#" className="footer-link">
                Blog
              </a>
              <a href="#" className="footer-link">
                Careers
              </a>
              <a href="#" className="footer-link">
                Contact
              </a>
            </div>

            <div className="link-group">
              <h4 className="link-title">Resources</h4>
              <a href="#" className="footer-link">
                Help Center
              </a>
              <a href="#" className="footer-link">
                Community
              </a>
              <a href="#" className="footer-link">
                Privacy
              </a>
              <a href="#" className="footer-link">
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2024 DarkCore AI. All rights reserved.</p>
          <p className="tagline">Built with ❤️ for the future of AI</p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 4rem 0 2rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          max-width: 400px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
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

        .brand-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .link-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .link-title {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
          padding: 0.25rem 0;
        }

        .footer-link:hover {
          color: var(--accent-primary);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .copyright {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .tagline {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-links {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
