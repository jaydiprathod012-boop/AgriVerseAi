import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Globe, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onMobileMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onMobileMenuClick, sidebarOpen }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Format the path to a readable title
  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path || path === 'dashboard') return 'Dashboard';
    
    return path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-[#050c08]/95 backdrop-blur-sm border-b border-green-900/30 z-10 sticky top-0">
      <div className="flex items-center flex-1">
        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
          onClick={onMobileMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-xl font-heading font-semibold text-white truncate">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex-1 flex justify-center px-2 hidden md:flex">
        <div className="max-w-md w-full">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative text-gray-400 focus-within:text-white">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full bg-white/5 border border-transparent rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white sm:text-sm transition-colors duration-200"
              placeholder="Search anything (crops, diseases, schemes)..."
              type="search"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-5 flex-1 justify-end">
        <button className="text-gray-400 hover:text-white p-1 rounded-full transition-colors hidden sm:block">
          <Globe className="h-5 w-5" />
        </button>
        
        <button className="relative p-1 text-gray-400 hover:text-white rounded-full transition-colors focus:outline-none">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" aria-hidden="true" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#050c08] notification-badge"></span>
        </button>

        <div className="relative flex-shrink-0" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex bg-[#0a1a10] text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050c08] focus:ring-green-500 border border-green-500/30"
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 text-white font-bold">
              {user?.avatar || 'AI'}
            </div>
          </button>

          {showDropdown && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-1 bg-[#0a1a10] border border-green-900/50 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="px-4 py-2 border-b border-green-900/30">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-green-400/80 truncate">{user?.email}</p>
              </div>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-green-100 hover:bg-[#153022] hover:text-white flex items-center gap-2 transition-colors"
              >
                <User size={16} /> Profile
              </button>
              <button 
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 flex items-center gap-2 transition-colors"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
