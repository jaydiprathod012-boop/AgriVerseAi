import { useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Bug,
  CloudSun,
  Sprout,
  TrendingUp,
  Mic,
  Store,
  FileText,
  Tractor,
  ShoppingCart,
  LineChart,
  Satellite,
  Bell,
  ChevronLeft,
  ChevronRight,
  Leaf
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, mobileOpen, onMobileClose, onToggle }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    {
      title: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'AI MODULES',
      items: [
        { name: 'Disease Detection', path: '/disease', icon: Bug },
        { name: 'Weather', path: '/weather', icon: CloudSun },
        { name: 'Yield Prediction', path: '/yield', icon: Sprout },
        { name: 'Mandi Prices', path: '/mandi', icon: TrendingUp },
        { name: 'AI Assistant', path: '/assistant', icon: Mic }
      ]
    },
    {
      title: 'MARKETPLACE',
      items: [
        { name: 'Nearby Shops', path: '/shops', icon: Store },
        { name: 'Schemes', path: '/schemes', icon: FileText },
        { name: 'Equipment', path: '/equipment', icon: Tractor },
        { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart }
      ]
    },
    {
      title: 'INSIGHTS',
      items: [
        { name: 'Analytics', path: '/analytics', icon: LineChart },
        { name: 'Satellite', path: '/satellite', icon: Satellite },
        { name: 'Notifications', path: '/notifications', icon: Bell }
      ]
    }
  ];

  return (
    <>
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:static inset-y-0 left-0 z-30 flex flex-col bg-[#0a1a10] border-r border-green-900/30 transition-all duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-green-900/30">
          <div className={`flex items-center space-x-3 ${!isOpen && 'justify-center w-full'}`}>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-500">
              <Leaf size={20} />
            </div>
            {isOpen && (
              <span className="font-heading font-semibold text-lg text-white">
                AgriVerse <span className="text-green-500">AI</span>
              </span>
            )}
          </div>
          {isOpen && (
            <button
              onClick={onToggle}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 hidden lg:block"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {!isOpen && (
            <button
              onClick={onToggle}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 absolute -right-3 top-5 bg-[#0a1a10] border border-green-900/30 hidden lg:block"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent">
          {navigation.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              {isOpen && (
                <h3 className="px-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <li key={item.name} className="px-3">
                      <NavLink
                        to={item.path}
                        onClick={() => mobileOpen && onMobileClose()}
                        className={`group flex items-center px-3 py-2 rounded-lg text-sm font-medium sidebar-item relative ${
                          isActive
                            ? 'active text-green-400 bg-green-500/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                        title={!isOpen ? item.name : undefined}
                      >
                        <item.icon
                          className={`flex-shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'} h-5 w-5 ${
                            isActive ? 'text-green-400' : 'text-gray-400 group-hover:text-gray-300'
                          }`}
                          aria-hidden="true"
                        />
                        {isOpen && <span className="truncate">{item.name}</span>}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom User Section */}
        <div className="p-4 border-t border-green-900/30">
          <div className="flex items-center justify-between mb-4">
            {isOpen && (
              <div className="flex space-x-1">
                {['HI', 'MR', 'EN'].map((lang) => (
                  <button
                    key={lang}
                    className={`text-xs px-2 py-1 rounded ${
                      lang === 'EN' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className={`flex items-center ${!isOpen && 'justify-center'}`}>
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center border border-green-400/30 shadow-lg shadow-green-500/20">
                <span className="text-sm font-medium text-white">{user?.avatar || 'AG'}</span>
              </div>
            </div>
            {isOpen && (
              <div className="ml-3 truncate">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'AgriVerse User'}</p>
                <p className="text-xs text-green-400/70 truncate">
                  {user?.district ? `${user.district}, ` : ''}{user?.state || user?.village || 'India'}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
