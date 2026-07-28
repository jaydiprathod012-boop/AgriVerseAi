import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-green-900/30 bg-gradient-to-b from-[#0a1a10] to-[#071510] text-green-100/70">
      
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
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-green-900/50 bg-green-900/20 flex items-center justify-center text-pink-400 hover:bg-pink-400/20 hover:border-pink-400/40 hover:scale-110 transition-all duration-300"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-green-900/50 bg-green-900/20 flex items-center justify-center text-blue-400 hover:bg-blue-400/20 hover:border-blue-400/40 hover:scale-110 transition-all duration-300"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="mailto:your@email.com"
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

      {/* Bottom Bar */}
      <div className="border-t border-green-900/20 bg-[#050c08]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-900/60">
          <p>© {new Date().getFullYear()} AgriVerse AI. All rights reserved.</p>
          <p className="text-green-700/80">
            Designed &amp; Developed by{' '}
            <span className="text-green-400 font-semibold">Jaydip Rathod</span>
            {' '}|{' '}
            <a href="tel:+91xxxxxxxxxx" className="hover:text-green-300 transition-colors">
              📞 +91 xxxxxxxxxx
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}
