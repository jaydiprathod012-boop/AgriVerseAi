import React, { useState } from 'react';
import { Bell, Check, X, Filter, AlertTriangle, CloudRain, TrendingUp, Landmark, Truck, Settings, Save, CheckCircle } from 'lucide-react';

const initialNotifications = [
  { id: 1, type: 'ALERT', title: 'Late Blight detected in tomato crop', desc: 'Field C requires immediate fungicide treatment', time: '1 hour ago', read: false },
  { id: 2, type: 'WEATHER', title: 'Heavy rainfall (45mm) expected tomorrow', desc: 'Pune region - protect crops and avoid harvesting', time: '2 hours ago', read: false },
  { id: 3, type: 'MARKET', title: 'Wheat prices rose 2.8% today', desc: 'Pune Mandi: ₹2,125/qtl', time: '3 hours ago', read: false },
  { id: 4, type: 'SCHEME', title: 'PM-KISAN installment credited', desc: '₹2,000 credited to your bank account ending in 4532', time: '5 hours ago', read: false },
  { id: 5, type: 'EQUIPMENT', title: 'Tractor booking confirmed', desc: 'Your John Deere tractor booking for July 20-22 is confirmed', time: '6 hours ago', read: false },
  { id: 6, type: 'SCHEME', title: 'New scheme announced', desc: '60% subsidy on drip irrigation systems in Maharashtra', time: 'Yesterday 6PM', read: true },
  { id: 7, type: 'MARKET', title: 'Onion prices up 15%', desc: 'Nashik market - Best time to sell this week', time: 'Yesterday 2PM', read: true },
  { id: 8, type: 'WEATHER', title: 'Soil moisture optimal', desc: 'Skip irrigation today to save ₹340 on pumping costs', time: 'Yesterday 11AM', read: true },
  { id: 9, type: 'ALERT', title: 'Aphid infestation risk HIGH', desc: 'Cotton crops in your district are at high risk', time: '2 days ago', read: true },
  { id: 10, type: 'SCHEME', title: 'PMFBY registration ending', desc: 'Last date for crop insurance registration: Aug 31, 2026', time: '2 days ago', read: true },
  { id: 11, type: 'MARKET', title: 'Cotton prices at 3-month high', desc: 'Currently trading at ₹6,234/qtl', time: '2 days ago', read: true },
  { id: 12, type: 'EQUIPMENT', title: 'Drone available for booking', desc: 'DJI Agras drone available this weekend in your area', time: '3 days ago', read: true },
  { id: 13, type: 'ALERT', title: 'Frost advisory', desc: 'Temperature dropping to 8°C - cover sensitive crops', time: '3 days ago', read: true },
  { id: 14, type: 'WEATHER', title: 'Perfect conditions for spraying', desc: 'Ideal wind and temp for pesticide application tomorrow 7-10AM', time: '4 days ago', read: true },
  { id: 15, type: 'SCHEME', title: 'Soil Health Card camp', desc: 'Camp scheduled in your village: July 25 at Gram Panchayat', time: '4 days ago', read: true },
  { id: 16, type: 'MARKET', title: 'Soybean prices expected to rise', desc: 'Analysts forecast upward trend next week', time: '5 days ago', read: true },
  { id: 17, type: 'SCHEME', title: 'PM Kisan Maandhan enrollment', desc: 'Special drive in Pune district: July 28-Aug 5', time: '5 days ago', read: true },
  { id: 18, type: 'EQUIPMENT', title: 'Harvester service discount', desc: '20% discount on harvester services this month', time: '6 days ago', read: true },
  { id: 19, type: 'WEATHER', title: 'Rainfall update', desc: 'Cumulative rainfall this season: 287mm (12% above normal)', time: '1 week ago', read: true },
  { id: 20, type: 'MARKET', title: 'E-NAM portal update', desc: 'Get better prices by listing directly online', time: '1 week ago', read: true },
];

const filters = ['All', 'Unread', 'Alerts', 'Weather', 'Market', 'Schemes', 'Equipment'];

const typeConfig = {
  ALERT: { icon: AlertTriangle, color: 'text-red-400', border: 'border-l-red-500', bg: 'bg-red-900/20' },
  WEATHER: { icon: CloudRain, color: 'text-blue-400', border: 'border-l-blue-500', bg: 'bg-blue-900/20' },
  MARKET: { icon: TrendingUp, color: 'text-green-400', border: 'border-l-green-500', bg: 'bg-green-900/20' },
  SCHEME: { icon: Landmark, color: 'text-purple-400', border: 'border-l-purple-500', bg: 'bg-purple-900/20' },
  EQUIPMENT: { icon: Truck, color: 'text-amber-400', border: 'border-l-amber-500', bg: 'bg-amber-900/20' },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showSettings, setShowSettings] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleSaveSettings = () => {
    setShowSettings(false);
    setToastMsg('Notification settings saved successfully!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const filteredNotifs = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.read;
    return n.type === activeFilter.toUpperCase().replace('S', '');
  });

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-6 font-sans">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>🔔</span> Notifications
        </h1>
        <div className="flex gap-3">
          <button 
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-[#0f2318] border border-green-900/30 rounded-lg text-green-300 hover:text-white hover:bg-[#153223] transition-colors text-sm font-medium"
          >
            Mark All Read
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Smart Summary */}
          <div className="bg-gradient-to-r from-[#0f2318] to-[#0a1510] border border-green-900/50 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold text-green-300 mb-2 flex items-center gap-2">
              <Bell className="w-5 h-5" /> You have {unreadCount} unread notifications
            </h3>
            <p className="text-sm text-green-500 flex flex-wrap gap-4">
              <span>📊 Stats this week:</span>
              <span className="text-red-400">3 Alerts</span>
              <span className="text-blue-400">4 Weather</span>
              <span className="text-green-400">5 Market</span>
              <span className="text-purple-400">3 Schemes</span>
              <span className="text-amber-400">2 Equipment</span>
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-4 gap-2 no-scrollbar border-b border-green-900/30">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 whitespace-nowrap transition-colors border-b-2 font-medium text-sm ${
                  activeFilter === f 
                    ? 'border-green-500 text-green-400' 
                    : 'border-transparent text-green-600 hover:text-green-300'
                }`}
              >
                {f} {f === 'All' ? `(${notifications.length})` : f === 'Unread' ? `(${unreadCount})` : ''}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {filteredNotifs.length === 0 ? (
              <div className="text-center py-12 text-green-500/50">
                No notifications found for this filter.
              </div>
            ) : (
              filteredNotifs.map(n => {
                const config = typeConfig[n.type as keyof typeof typeConfig];
                const Icon = config.icon;
                return (
                  <div key={n.id} className={`bg-[#0f2318] border border-green-900/20 border-l-4 ${config.border} rounded-r-xl p-4 flex gap-4 transition-all hover:bg-[#122b1d] ${!n.read ? 'bg-[#153223]' : ''}`}>
                    <div className={`mt-1 p-2 rounded-full ${config.bg} ${config.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-bold text-base ${!n.read ? 'text-white' : 'text-green-100/90'}`}>{n.title}</h4>
                        <span className="text-xs text-green-500/70 whitespace-nowrap ml-2">{n.time}</span>
                      </div>
                      <p className={`text-sm ${!n.read ? 'text-green-300' : 'text-green-500'}`}>{n.desc}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                      {!n.read && (
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 mb-1" title="Unread"></div>
                      )}
                      <div className="flex gap-2">
                        {!n.read && (
                          <button onClick={() => handleMarkRead(n.id)} className="text-green-500 hover:text-green-300 p-1 bg-[#0a1510] rounded" title="Mark Read">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => handleDismiss(n.id)} className="text-red-500/70 hover:text-red-400 p-1 bg-[#0a1510] rounded" title="Dismiss">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="lg:col-span-1">
            <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5 sticky top-6">
              <h3 className="text-xl font-bold mb-6 text-green-300">Notification Settings</h3>
              
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-2">Categories</h4>
                {['Disease Alerts', 'Weather Alerts', 'Market Prices', 'Scheme Updates', 'Equipment Booking', 'AI Insights'].map(setting => (
                  <label key={setting} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-green-100">{setting}</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input type="checkbox" name="toggle" id={`toggle-${setting}`} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500" defaultChecked={setting !== 'AI Insights'} />
                      <label htmlFor={`toggle-${setting}`} className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-700 cursor-pointer"></label>
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-4 mb-6 border-t border-green-900/30 pt-4">
                <h4 className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-2">Thresholds</h4>
                <div>
                  <label className="block text-xs text-green-400 mb-1">Price Alert Threshold (%)</label>
                  <input type="number" defaultValue={5} className="w-full bg-[#0a1510] border border-green-900/50 rounded p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-xs text-green-400 mb-1">Rainfall Alert Threshold (mm)</label>
                  <input type="number" defaultValue={20} className="w-full bg-[#0a1510] border border-green-900/50 rounded p-2 text-sm text-white" />
                </div>
              </div>

              <div className="space-y-4 mb-6 border-t border-green-900/30 pt-4">
                <h4 className="text-sm font-semibold text-green-500 uppercase tracking-wider mb-2">Delivery Methods</h4>
                <div>
                  <label className="block text-xs text-green-400 mb-1">WhatsApp Number</label>
                  <div className="flex">
                    <span className="bg-[#0a1510] border border-r-0 border-green-900/50 rounded-l p-2 text-sm text-green-500">+91</span>
                    <input type="tel" defaultValue="9876543210" className="w-full bg-[#0a1510] border border-green-900/50 rounded-r p-2 text-sm text-white" />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer mt-2">
                  <input type="checkbox" className="w-4 h-4 accent-green-500" defaultChecked />
                  <span className="text-sm text-green-300">Enable Push Notifications</span>
                </label>
              </div>

              <button 
                onClick={handleSaveSettings}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Settings
              </button>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
              .toggle-checkbox:checked {
                right: 0;
                border-color: #22c55e;
              }
              .toggle-checkbox:checked + .toggle-label {
                background-color: #166534;
              }
              .toggle-checkbox {
                right: 0;
                z-index: 1;
                border-color: #4b5563;
                transition: all 0.3s;
              }
              .toggle-label {
                width: 2.5rem;
              }
            `}} />
          </div>
        )}
      </div>
    </div>
  );
}
