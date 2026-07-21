import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Bell, Search, 
  MapPin, Calendar, Activity, ChevronRight,
  LineChart as LineChartIcon, Info
} from 'lucide-react';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, ReferenceLine
} from 'recharts';

const tickerData = [
  { name: 'Wheat', price: '₹2,125', trend: 'up' },
  { name: 'Rice', price: '₹2,183', trend: 'down' },
  { name: 'Cotton', price: '₹6,234', trend: 'up' },
  { name: 'Soybean', price: '₹4,521', trend: 'down' },
  { name: 'Onion', price: '₹1,890', trend: 'up' },
  { name: 'Potato', price: '₹1,245', trend: 'up' },
  { name: 'Tomato', price: '₹2,890', trend: 'down' },
  { name: 'Bajra', price: '₹1,890', trend: 'up' },
];

const commodities = ['Wheat', 'Rice', 'Cotton', 'Soybean', 'Onion', 'Potato', 'Tomato', 'Bajra', 'Jowar', 'Maize'];

const chartData = [
  { date: '1 Jul', price: 2050, volume: 10200 },
  { date: '5 Jul', price: 2100, volume: 11000 },
  { date: '10 Jul', price: 2080, volume: 10500 },
  { date: '15 Jul', price: 2150, volume: 12100 },
  { date: '20 Jul', price: 2125, volume: 12450 },
];

const forecastData = [
  { date: '21 Jul', price: 2130 },
  { date: '24 Jul', price: 2180 },
  { date: '27 Jul', price: 2210 },
];

const mandiTableData = [
  { mandi: 'Pune', district: 'Pune', state: 'Maharashtra', min: 2000, max: 2200, modal: 2125, arrivals: 1200 },
  { mandi: 'Nashik', district: 'Nashik', state: 'Maharashtra', min: 1950, max: 2150, modal: 2100, arrivals: 1500 },
  { mandi: 'Solapur', district: 'Solapur', state: 'Maharashtra', min: 1980, max: 2180, modal: 2110, arrivals: 900 },
  { mandi: 'Indore', district: 'Indore', state: 'MP', min: 2050, max: 2250, modal: 2150, arrivals: 2500 },
  { mandi: 'Bhopal', district: 'Bhopal', state: 'MP', min: 2020, max: 2220, modal: 2140, arrivals: 1800 },
  { mandi: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', min: 1990, max: 2190, modal: 2120, arrivals: 1100 },
  { mandi: 'Aurangabad', district: 'Aurangabad', state: 'Maharashtra', min: 1960, max: 2160, modal: 2105, arrivals: 850 },
  { mandi: 'Jalgaon', district: 'Jalgaon', state: 'Maharashtra', min: 1970, max: 2170, modal: 2115, arrivals: 1050 },
  { mandi: 'Sangli', district: 'Sangli', state: 'Maharashtra', min: 1940, max: 2140, modal: 2090, arrivals: 700 },
  { mandi: 'Kolhapur', district: 'Kolhapur', state: 'Maharashtra', min: 1950, max: 2150, modal: 2095, arrivals: 800 },
];

const stateData = [
  { state: 'Maharashtra', avgPrice: 2110 },
  { state: 'MP', avgPrice: 2145 },
  { state: 'UP', avgPrice: 2080 },
  { state: 'Punjab', avgPrice: 2200 },
  { state: 'Haryana', avgPrice: 2190 },
  { state: 'Rajasthan', avgPrice: 2130 },
];

const newsItems = [
  { title: 'Wheat MSP increased by ₹150 for 2026-27', time: '2 days ago', impact: 'positive' },
  { title: 'Heavy rainfall in Punjab may affect procurement', time: 'Today', impact: 'negative' },
  { title: 'Government opens procurement centers early', time: 'Yesterday', impact: 'positive' },
];

export default function MandiPrices() {
  const [activeTab, setActiveTab] = useState('Wheat');
  const [alertTarget, setAlertTarget] = useState('');
  
  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f2318] border-b border-green-900/50 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <h1 className="text-xl font-bold text-green-50">LIVE Mandi Prices</h1>
          </div>
          <div className="text-sm text-green-400/70 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Last Updated: 11:45 AM
          </div>
        </div>
      </header>

      {/* Ticker */}
      <div className="bg-green-950/40 border-b border-green-900/30 overflow-hidden py-2 flex whitespace-nowrap relative">
        <div className="animate-[marquee_20s_linear_infinite] flex space-x-8 px-4">
          {tickerData.map((item, idx) => (
            <span key={idx} className="flex items-center space-x-1 font-medium text-sm">
              <span className="text-green-100">{item.name}</span>
              <span className="text-green-50">{item.price}</span>
              {item.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </span>
          ))}
          {/* Duplicate for seamless marquee */}
          {tickerData.map((item, idx) => (
            <span key={`dup-${idx}`} className="flex items-center space-x-1 font-medium text-sm">
              <span className="text-green-100">{item.name}</span>
              <span className="text-green-50">{item.price}</span>
              {item.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </span>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 space-y-8">
        
        {/* Commodity Tabs */}
        <div className="flex overflow-x-auto no-scrollbar space-x-2 border-b border-green-900/30 pb-2">
          {commodities.map((comm) => (
            <button
              key={comm}
              onClick={() => setActiveTab(comm)}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium transition-colors ${
                activeTab === comm
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-green-300/60 hover:text-green-200'
              }`}
            >
              {comm}
            </button>
          ))}
        </div>

        {/* Hero & Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Hero Card */}
          <div className="lg:col-span-1 bg-[#0f2318] border border-green-900/30 rounded-2xl p-6 shadow-lg shadow-black/50">
            <h2 className="text-2xl font-bold mb-2">{activeTab} Overview</h2>
            <div className="text-5xl font-extrabold text-white mb-2">₹2,125<span className="text-lg text-green-400/60 font-medium">/quintal</span></div>
            <div className="flex items-center space-x-2 text-green-400 font-semibold mb-6">
              <TrendingUp className="w-5 h-5" />
              <span>+₹45 (+2.17%)</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-green-900/30">
                <span className="text-green-400/70">52-week High/Low</span>
                <span className="font-medium">₹2,456 / ₹1,834</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-green-900/30">
                <span className="text-green-400/70">Volume Today</span>
                <span className="font-medium">12,450 quintals</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-green-400/70">Trend Indicator</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">BULLISH</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 bg-[#0f2318] border border-green-900/30 rounded-2xl p-6 shadow-lg shadow-black/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-amber-400" />
              30-Day Price Movement
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f402c" vertical={false} />
                  <XAxis dataKey="date" stroke="#4ade8080" tick={{ fill: '#4ade8080', fontSize: 12 }} />
                  <YAxis yAxisId="left" stroke="#4ade8080" tick={{ fill: '#4ade8080', fontSize: 12 }} domain={['dataMin - 50', 'dataMax + 50']} />
                  <YAxis yAxisId="right" orientation="right" stroke="#1f402c" tick={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f2318', borderColor: '#1f402c', color: '#f0fdf4' }}
                    itemStyle={{ color: '#4ade80' }}
                  />
                  <Bar yAxisId="right" dataKey="volume" fill="#1f402c" barSize={20} name="Volume (q)" />
                  <Line yAxisId="left" type="monotone" dataKey="price" stroke="#4ade80" strokeWidth={3} dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fbbf24' }} name="Price (₹)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Prediction & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* AI Predictor */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0f2318] to-[#0a1810] border border-green-500/30 rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <LineChartIcon className="w-32 h-32" />
            </div>
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-300">
              <span className="bg-amber-400/20 text-amber-400 p-1.5 rounded-lg mr-2 border border-amber-400/30">
                <Activity className="w-4 h-4" />
              </span>
              AI Price Prediction
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f402c" vertical={false} />
                      <XAxis dataKey="date" stroke="#4ade8080" tick={{ fill: '#4ade8080', fontSize: 12 }} />
                      <YAxis stroke="#4ade8080" tick={{ fill: '#4ade8080', fontSize: 12 }} domain={['dataMin - 20', 'dataMax + 20']} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f2318', borderColor: '#1f402c' }} />
                      <Line type="monotone" dataKey="price" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#fbbf24', r: 4 }} name="Forecast (₹)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="w-full md:w-64 space-y-4">
                <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
                  <div className="text-xs text-green-400/70 uppercase tracking-wider mb-1">Best Time to Sell</div>
                  <div className="text-green-400 font-bold text-lg">This Thursday to Saturday</div>
                </div>
                <div className="text-sm text-green-100/80 leading-relaxed">
                  <span className="font-semibold text-green-300">Reasoning:</span> Mela season approaching, demand expected to rise across major mandis.
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-400/70">Confidence:</span>
                  <span className="font-bold text-amber-400">78%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Alert */}
          <div className="lg:col-span-1 bg-[#0f2318] border border-green-900/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-green-400" />
              Set Price Alert
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs text-green-400/70 mb-1">Commodity</label>
                <select className="w-full bg-[#050c08] border border-green-900/50 rounded-lg p-2.5 text-green-50 focus:outline-none focus:border-green-500 transition-colors">
                  <option>Wheat</option>
                  <option>Rice</option>
                  <option>Cotton</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-green-400/70 mb-1">Target Price (₹)</label>
                <input 
                  type="number" 
                  value={alertTarget}
                  onChange={(e) => setAlertTarget(e.target.value)}
                  placeholder="e.g. 2200"
                  className="w-full bg-[#050c08] border border-green-900/50 rounded-lg p-2.5 text-green-50 focus:outline-none focus:border-green-500 transition-colors placeholder:text-green-900"
                />
              </div>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="radio" name="direction" defaultChecked className="accent-green-500" />
                  <span>Goes Above</span>
                </label>
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="radio" name="direction" className="accent-green-500" />
                  <span>Goes Below</span>
                </label>
              </div>
              <div>
                <label className="block text-xs text-green-400/70 mb-1">Notify via</label>
                <select className="w-full bg-[#050c08] border border-green-900/50 rounded-lg p-2.5 text-green-50 focus:outline-none focus:border-green-500 transition-colors">
                  <option>WhatsApp</option>
                  <option>SMS</option>
                  <option>Email</option>
                </select>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-green-900/20">
                Set Alert
              </button>
            </form>
          </div>
        </div>

        {/* Lower Section: Table & States */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Table */}
          <div className="lg:col-span-2 bg-[#0f2318] border border-green-900/30 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-4 border-b border-green-900/30 flex justify-between items-center bg-green-950/20">
              <h3 className="text-lg font-semibold">Mandi Comparisons</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-green-400/50" />
                <input 
                  type="text" 
                  placeholder="Search mandi..."
                  className="bg-[#050c08] border border-green-900/50 rounded-full pl-9 pr-4 py-1.5 text-sm text-green-50 focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0a1810] text-green-400/70 border-b border-green-900/30">
                  <tr>
                    <th className="px-4 py-3 font-medium">Mandi</th>
                    <th className="px-4 py-3 font-medium">District/State</th>
                    <th className="px-4 py-3 font-medium">Min (₹)</th>
                    <th className="px-4 py-3 font-medium">Max (₹)</th>
                    <th className="px-4 py-3 font-medium text-green-300">Modal (₹)</th>
                    <th className="px-4 py-3 font-medium">Arrivals (q)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-900/20">
                  {mandiTableData.map((row, i) => (
                    <tr key={i} className="hover:bg-green-900/10 transition-colors">
                      <td className="px-4 py-3 font-medium text-green-100">{row.mandi}</td>
                      <td className="px-4 py-3 text-green-400/70">{row.district}, {row.state}</td>
                      <td className="px-4 py-3">{row.min}</td>
                      <td className="px-4 py-3">{row.max}</td>
                      <td className="px-4 py-3 font-bold text-green-400">{row.modal}</td>
                      <td className="px-4 py-3">{row.arrivals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar: States & News */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* States Chart */}
            <div className="bg-[#0f2318] border border-green-900/30 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">State Averages</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f402c" horizontal={false} />
                    <XAxis type="number" stroke="#4ade8080" tick={{ fill: '#4ade8080', fontSize: 10 }} domain={['dataMin - 100', 'dataMax + 100']} />
                    <YAxis dataKey="state" type="category" stroke="#4ade8080" tick={{ fill: '#4ade8080', fontSize: 10 }} width={70} />
                    <Tooltip cursor={{fill: '#1f402c'}} contentStyle={{ backgroundColor: '#0f2318', borderColor: '#1f402c' }} />
                    <Bar dataKey="avgPrice" fill="#4ade80" radius={[0, 4, 4, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* News */}
            <div className="bg-[#0f2318] border border-green-900/30 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-green-400" />
                Market News
              </h3>
              <div className="space-y-4">
                {newsItems.map((news, i) => (
                  <div key={i} className="flex gap-3 pb-4 border-b border-green-900/20 last:border-0 last:pb-0">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${news.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <h4 className="text-sm font-medium text-green-100 hover:text-green-400 transition-colors cursor-pointer leading-tight mb-1">
                        {news.title}
                      </h4>
                      <p className="text-xs text-green-400/50">{news.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>
      
      {/* Required style for marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// Needed because Recharts BarChart wasn't imported properly with the composed chart
import { BarChart } from 'recharts';
