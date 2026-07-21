import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from './Card';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: 'green' | 'amber' | 'red' | 'blue';
  prefix?: string;
  suffix?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendValue,
  color = 'green',
  prefix = '',
  suffix = ''
}: StatCardProps) {
  const [animatedValue, setAnimatedValue] = useState<string | number>(typeof value === 'number' ? 0 : value);

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1000;
      const steps = 30;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setAnimatedValue(Math.floor(value * progress));

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedValue(value);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [value]);

  const getColorClasses = () => {
    switch (color) {
      case 'green': return 'bg-green-500/20 text-green-400';
      case 'amber': return 'bg-amber-500/20 text-amber-400';
      case 'red': return 'bg-red-500/20 text-red-400';
      case 'blue': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-green-500/20 text-green-400';
    }
  };

  return (
    <Card className="hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
          <div className="flex items-baseline space-x-1">
            {prefix && <span className="text-xl font-medium text-gray-300">{prefix}</span>}
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              {animatedValue}
            </h3>
            {suffix && <span className="text-xl font-medium text-gray-300">{suffix}</span>}
          </div>
          
          {trend && trendValue && (
            <div className="flex items-center mt-2 space-x-1">
              {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
              <span className={`text-xs font-medium ${
                trend === 'up' ? 'text-green-400' : 
                trend === 'down' ? 'text-red-400' : 
                'text-gray-400'
              }`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${getColorClasses()}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
