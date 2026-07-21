import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md';
}

export default function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'danger':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'info':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'default':
      default:
        return 'bg-gray-500/10 text-gray-300 border border-gray-500/20';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'md':
      default:
        return 'px-2.5 py-1 text-sm';
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'success': return 'bg-green-400';
      case 'warning': return 'bg-amber-400';
      case 'danger': return 'bg-red-400';
      case 'info': return 'bg-blue-400';
      case 'default': return 'bg-gray-400';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${getVariantClasses()} ${getSizeClasses()}`}>
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${getDotColor()}`}></span>
      {children}
    </span>
  );
}
