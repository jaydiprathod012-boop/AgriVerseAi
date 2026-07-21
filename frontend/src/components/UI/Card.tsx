import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  glowColor?: 'green' | 'amber' | 'red' | 'blue' | 'none';
}

export default function Card({ 
  children, 
  className = '', 
  title, 
  subtitle,
  action,
  glowColor = 'none' 
}: CardProps) {
  
  const getGlowClass = () => {
    switch (glowColor) {
      case 'green': return 'hover:glow-green transition-shadow duration-300';
      case 'amber': return 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-shadow duration-300';
      case 'red': return 'hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-shadow duration-300';
      case 'blue': return 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow duration-300';
      default: return '';
    }
  };

  return (
    <div className={`glass-card overflow-hidden ${getGlowClass()} ${className}`}>
      {(title || action) && (
        <div className="px-5 py-4 border-b border-green-900/30 flex justify-between items-center bg-white/[0.02]">
          <div>
            {title && <h3 className="text-lg font-heading font-medium text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
