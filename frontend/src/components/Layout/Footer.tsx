import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';

// ✅ Inline SVG — no dependency issues
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MailIcon14 = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-green-900/30 bg-gradient-to-b from-[#0a1a10] to-[#071510] text-green-100/70">

      <style>{`
        .universe-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 28px;
          border-radius: 999px;
          background: radial-gradient(ellipse at center, #0d1b3e 0%, #050818 60%, #000 100%);
          border: none;
          cursor: default;
          overflow: hidden;
          text-decoration: none;
          min-width: 200px;
        }
        .universe-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;
          padding: 1.5px;
          background: linear-gradient(135deg, #ffffff60, #4fc3f7, #7c3aed, #06b6d4, #ffffff40);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderRotate 4s linear infinite;
          background-size: 300% 300%;
        }
        @keyframes borderRotate {
          0%   { background-position: 0% 50%;   box-shadow: 0 0 12px #4fc3f7, 0 0 30px #4fc3f780; }
          50%  { background-position: 100% 50%; box-shadow: 0 0 16px #7c3aed, 0 0 40px #7c3aed80; }
          100% { background-position: 0% 50%;   box-shadow: 0 0 12px #4fc3f7, 0 0 30px #4fc3f780; }
        }
        .universe-btn::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 999px;
          background: transparent;
          box-shadow: 0 0 20px #4fc3f760, 0 0 50px #7c3aed40, 0 0 80px #06b6d420;
          animation: outerGlow 3s ease-in-out infinite alternate;
        }
        @keyframes outerGlow {
          from { box-shadow: 0 0 15px #4fc3f760, 0 0 40px #7c3aed30, 0 0 60px #06b6d420; }
          to   { box-shadow: 0 0 25px #4fc3f7aa, 0 0 60px #7c3aed60, 0 0 100px #06b6d440; }
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: #fff;
          animation: twinkle var(--dur, 2s) ease-in-out infinite var(--delay, 0s);
          opacity: 0;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50%       { opacity: 1; transform: scale(1.2); }
        }
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          animation: floatUp var(--dur, 3s) ease-in-out infinite var(--delay, 0s);
          opacity: 0;
        }
        @keyframes floatUp {
          0%   { transform: translateY(20px) scale(0); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
        .universe-text {
          position: relative;
          z-index: 10;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #e0f2fe, #ffffff, #bae6fd, #e0e7ff, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease infinite;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
        }
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .dev-label {
          color: #6ee7b7;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.8;
        }
        .social-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(34,197,94,0.2);
          background: rgba(34,197,94,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .social-icon-btn:hover {
          transform: scale(1.15) translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .social-insta:hover  { background: rgba(236,72,153,0.2); border-color: rgba(236,72,153,0.5); color: #f472b6; }
        .social-linkedin:hover { background: rgba(59,130,246,0.2); border-color: rgba(59,130,246,0.5); color: #60a5fa; }
        .social-mail:hover   { background: rgba(52,211,153,0.2); border-color: rgba(52,211,153,0.5); color: #34d399; }
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

            {/* ✅ Social Icons — Always Visible */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://www.instagram.com/im_jayy_100/?hl=en"
                target="_blank" rel="noopener noreferrer"
                className="social-icon-btn social-insta"
                style={{ color: '#f472b6' }}
                title="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/in/jaydiptech2005/"
                target="_blank" rel="noopener noreferrer"
                className="social-icon-btn social-linkedin"
                style={{ color: '#60a5fa' }}
                title="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="jaydiprathod012@gmail.com"
                className="social-icon-btn social-mail"
                style={{ color: '#34d399' }}
                title="Email">
                <MailIcon14 />
              </a>
            </div>

            {/* Labels below icons */}
            <div className="flex items-center gap-4 text-xs text-green-900/60">
              <span style={{ width: 36, textAlign: 'center' }}>Insta</span>
              <span style={{ width: 36, textAlign: 'center' }}>LinkedIn</span>
              <span style={{ width: 36, textAlign: 'center' }}>Email</span>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Dashboard',           to: '/dashboard' },
                { label: 'Disease Detection',   to: '/disease'   },
                { label: 'Weather Intelligence',to: '/weather'   },
                { label: 'Mandi Prices',        to: '/mandi'     },
                { label: 'Yield Prediction',    to: '/yield'     },
                { label: 'Government Schemes',  to: '/schemes'   },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to}
                    className="text-green-100/50 hover:text-green-300 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1">
                    <span className="text-green-600">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Contact</h3>
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

      {/* Bottom Bar */}
      <div className="border-t border-green-900/20 bg-[#050c08]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">

          <p className="text-green-900/60">
            © {new Date().getFullYear()} AgriVerse AI. All rights reserved.
          </p>

          {/* ✨ Universe Button */}
          <div className="flex flex-col items-center gap-2">
            <span className="dev-label">Designed &amp; Developed by</span>

            <div className="universe-btn">
              {/* Stars */}
              {[
                { left:'8%',  top:'20%', dur:'2.1s', delay:'0s'    },
                { left:'18%', top:'70%', dur:'1.8s', delay:'0.3s'  },
                { left:'30%', top:'30%', dur:'2.5s', delay:'0.6s'  },
                { left:'45%', top:'75%', dur:'1.6s', delay:'0.1s'  },
                { left:'60%', top:'20%', dur:'2.2s', delay:'0.8s'  },
                { left:'72%', top:'60%', dur:'1.9s', delay:'0.4s'  },
                { left:'85%', top:'35%', dur:'2.4s', delay:'0.2s'  },
                { left:'92%', top:'80%', dur:'1.7s', delay:'0.9s'  },
                { left:'25%', top:'50%', dur:'2.0s', delay:'0.7s'  },
                { left:'55%', top:'45%', dur:'2.3s', delay:'0.5s'  },
                { left:'78%', top:'15%', dur:'1.5s', delay:'1.0s'  },
                { left:'5%',  top:'55%', dur:'2.6s', delay:'0.15s' },
              ].map((s, i) => (
                <div key={i} className="star"
                  style={{ left:s.left, top:s.top, '--dur':s.dur, '--delay':s.delay } as React.CSSProperties} />
              ))}

              {/* Particles */}
              {[
                { left:'15%', color:'#4fc3f7', dur:'3s',   delay:'0s'   },
                { left:'35%', color:'#7c3aed', dur:'2.5s', delay:'0.5s' },
                { left:'55%', color:'#06b6d4', dur:'3.5s', delay:'1s'   },
                { left:'75%', color:'#818cf8', dur:'2.8s', delay:'0.3s' },
                { left:'90%', color:'#38bdf8', dur:'3.2s', delay:'0.8s' },
              ].map((p, i) => (
                <div key={i} className="particle"
                  style={{ left:p.left, bottom:'0', background:p.color, '--dur':p.dur, '--delay':p.delay } as React.CSSProperties} />
              ))}

              <span className="universe-text">Jaydip Rathod</span>
            </div>

            <a href="tel:+91xxxxxxxxxx"
              className="text-green-800/70 hover:text-green-400 transition-colors text-xs">
              📞 +91 xxxxxxxxxx
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
