import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-green-900/30 bg-gradient-to-b from-[#0a1a10] to-[#071510] text-green-100/70">

      {/* ✨ Neon Name CSS */}
      <style>{`
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow:
              0 0 4px #fff,
              0 0 10px #fff,
              0 0 20px #0fa,
              0 0 40px #0fa,
              0 0 80px #0fa,
              0 0 90px #0fa,
              0 0 100px #0fa,
              0 0 150px #0fa;
            color: #fff;
          }
          20%, 24%, 55% {
            text-shadow: none;
            color: #aaa;
          }
        }

        @keyframes neonPulse {
          0%, 100% {
            text-shadow:
              0 0 5px #fff,
              0 0 10px #fff,
              0 0 25px #ff00ff,
              0 0 50px #ff00ff,
              0 0 80px #ff00ff,
              0 0 100px #ff00ff;
            color: #ff88ff;
          }
          25% {
            text-shadow:
              0 0 5px #fff,
              0 0 15px #fff,
              0 0 30px #00ffff,
              0 0 60px #00ffff,
              0 0 90px #00ffff;
            color: #88ffff;
          }
          50% {
            text-shadow:
              0 0 5px #fff,
              0 0 15px #fff,
              0 0 30px #0fa,
              0 0 60px #0fa,
              0 0 90px #0fa,
              0 0 120px #0fa;
            color: #88ffcc;
          }
          75% {
            text-shadow:
              0 0 5px #fff,
              0 0 15px #fff,
              0 0 30px #ff6600,
              0 0 60px #ff6600,
              0 0 90px #ff6600;
            color: #ffaa66;
          }
        }

        @keyframes float3d {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg);
          }
          50% {
            transform: translateY(-4px) rotateX(5deg);
          }
        }

        @keyframes colorShift {
          0%   { color: #ff00ff; }
          20%  { color: #00ffff; }
          40%  { color: #00ff88; }
          60%  { color: #ffaa00; }
          80%  { color: #ff4488; }
          100% { color: #ff00ff; }
        }

        .neon-name {
          animation: neonPulse 3s ease-in-out infinite, float3d 3s ease-in-out infinite;
          font-weight: 900;
          letter-spacing: 0.12em;
          font-size: 0.9rem;
          text-transform: uppercase;
          display: inline-block;
          perspective: 500px;
          background: linear-gradient(90deg, #ff00ff, #00ffff, #00ff88, #ffaa00, #ff4488);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: brightness(1.4) drop-shadow(0 0 8px #0fa) drop-shadow(0 0 16px #ff00ff);
        }

        @keyframes bgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .neon-name {
          animation: neonPulse 3s ease-in-out infinite, float3d 3s ease-in-out infinite, bgShift 4s ease infinite;
        }

        .neon-pipe {
          color: #444;
          margin: 0 6px;
        }

        .neon-label {
          color: #6ee7b7;
          font-size: 0.75rem;
        }
      `}</style>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Leaf size={18} className="text-green-400" />
              </div>
              <span className="text-white font-bold text-lg">
                AgriVerse <span className="text-green-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-green-100/50 leading-relaxed">
              दिल से खेती — भारतीय किसानों का AI साथी। स्मार्ट फार्मिंग के लिए आपका विश्वसनीय डिजिटल साथी।
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/im_jayy_100/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-green-900/50 bg-green-900/20 flex items-center justify-center text-pink-400 hover:bg-pink-400/20 hover:border-pink-400/40 hover:scale-110 transition-all duration-300"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/jaydiptech2005/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-green-900/50 bg-green-900/20 flex items-center justify-center text-blue-400 hover:bg-blue-400/20 hover:border-blue-400/40 hover:scale-110 transition-all duration-300"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="jaydiprathod012@gmail.com"
                className="w-8 h-8 rounded-full border border-green-900/50 bg-green-900/20 flex items-center justify-center text-green-400 hover:bg-green-400/20 hover:border-green-400/40 hover:scale-110 transition-all duration-300"
              >
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'Disease Detection', to: '/disease' },
                { label: 'Weather Intelligence', to: '/weather' },
                { label: 'Mandi Prices', to: '/mandi' },
                { label: 'Yield Prediction', to: '/yield' },
                { label: 'Government Schemes', to: '/schemes' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-green-100/50 hover:text-green-300 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1"
                  >
                    <span className="text-green-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-green-100/50">
                <Mail size={15} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span>support@agriverse.ai</span>
              </li>
              <li className="flex items-start gap-3 text-green-100/50">
                <Phone size={15} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span>+91 8329910022</span>
              </li>
              <li className="flex items-start gap-3 text-green-100/50">
                <MapPin size={15} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span>Maharashtra, India</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar with Neon Name */}
      <div className="border-t border-green-900/20 bg-[#050c08]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          
          <p className="text-green-900/60">
            © {new Date().getFullYear()} AgriVerse AI. All rights reserved.
          </p>

          {/* ✨ Neon Animated Name */}
          <div className="flex items-center gap-1 flex-wrap justify-center">
            <span className="neon-label">Designed &amp; Developed by</span>
            <span className="neon-pipe">|</span>
            <span className="neon-name">Jaydip Rathod</span>
            <span className="neon-pipe">|</span>
            <a
              href="tel:+91xxxxxxxxxx"
              className="text-green-700/70 hover:text-green-400 transition-colors"
            >
              📞 +91 xxxxxxxxxx
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
