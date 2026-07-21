import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ElementType;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  
  const getBaseClasses = () => {
    const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050c08]";
    const width = fullWidth ? "w-full" : "";
    const opacity = disabled || loading ? "opacity-60 cursor-not-allowed" : "active:scale-[0.98]";
    
    return `${base} ${width} ${opacity}`;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return "px-3 py-1.5 text-sm";
      case 'lg': return "px-6 py-3 text-lg";
      case 'md': 
      default: return "px-4 py-2 text-sm";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 border border-transparent hover:from-green-400 hover:to-green-500 focus:ring-green-500";
      case 'secondary':
        return "bg-white/5 text-white border border-green-500/30 hover:bg-green-500/10 focus:ring-green-500";
      case 'ghost':
        return "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent focus:ring-gray-500";
      case 'danger':
        return "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 hover:text-red-400 focus:ring-red-500";
      case 'amber':
        return "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 border border-transparent hover:from-amber-400 hover:to-amber-500 focus:ring-amber-500";
    }
  };

  return (
    <button
      className={`${getBaseClasses()} ${getSizeClasses()} ${getVariantClasses()} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
}
