import { Instagram, Linkedin, Mail, Heart, Code2 } from 'lucide-react';

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/im_jayy_100/?hl=en',
    color: 'hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-400/10',
    iconColor: 'text-pink-400',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jaydiptech2005/',
    color: 'hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'jaydiprathod012@gmail.com',
    color: 'hover:text-green-400 hover:border-green-400/50 hover:bg-green-400/10',
    iconColor: 'text-green-400',
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-green-900/30 bg-gradient-to-r from-[#071510] via-[#0a1a10] to-[#071510] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-center">

          {/* Left: Developer credit */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2 text-green-400/60 text-xs">
              <Code2 size={12} />
              <span className="uppercase tracking-widest font-medium">Designed &amp; Developed by</span>
            </div>
            <p className="text-white font-bold tracking-[0.15em] text-sm uppercase bg-gradient-to-r from-green-300 to-lime-300 bg-clip-text text-transparent">
              Jaydip Rathod
            </p>
          </div>

          {/* Center */}
          <div className="hidden sm:flex items-center gap-1.5 text-green-900/60 text-xs">
            <span>Made with</span>
            <Heart size={12} className="text-red-500/70 fill-red-500/70" />
            <span>for Indian farmers</span>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, label, href, color, iconColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-green-900/40 bg-green-900/10 text-gray-400 text-xs font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg ${color}`}
              >
                <Icon size={13} className={`transition-colors ${iconColor} opacity-80`} />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>

        </div>

        {/* Bottom line */}
        <div className="mt-4 pt-3 border-t border-green-900/20 text-center">
          <p className="text-green-900/50 text-xs">
            © {new Date().getFullYear()} AgriVerse AI · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
