import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Leaf, 
  Map as MapIcon, 
  Zap, 
  Bell, 
  Droplets, 
  Thermometer, 
  Wind, 
  CloudRain, 
  Sun, 
  Activity, 
  BarChart2, 
  TrendingUp, 
  AlertTriangle, 
  Bug, 
  Sprout, 
  Landmark, 
  Wallet,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Camera,
  Cloud,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const yieldData = [
  { month: 'Jan', wheat: 20, rice: 0 },
  { month: 'Feb', wheat: 25, rice: 0 },
  { month: 'Mar', wheat: 35, rice: 0 },
  { month: 'Apr', wheat: 50, rice: 0 },
  { month: 'May', wheat: 10, rice: 20 },
  { month: 'Jun', wheat: 0, rice: 45 },
];

const tips = [
  "Today is ideal for nitrogen top-dressing in wheat. Apply 50kg urea/acre.",
  "Mandi prices for onion trending up. Consider selling 20-30% of stock this week.",
  "Weather forecast shows 3 rain-free days. Ideal for pesticide application."
];

export default function Dashboard() {
  const { user } = useAuth();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const displayName = user?.name || user?.email || 'Farmer';
  const displayLocation = user?.district && user?.state
    ? `${user.district}, ${user.state}`
    : user?.village || 'India';
  const displayLand = user?.landArea ? `${user.landArea} acres` : '—';
  const displayCrop = user?.cropType || 'Mixed';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-4 md:p-6 lg:p-8 font-sans overflow-x-hidden">
      
      {/* 1. Hero greeting section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2318] to-[#0a1810] border border-green-900/30 p-6 md:p-10 mb-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 animate-pulse">
          <Sprout size={120} className="text-green-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-lime-300">
              <span className="text-4xl">🌾</span> नमस्ते, {displayName}!
            </h1>
            <p className="text-green-300/80 text-lg flex items-center gap-2">
              {displayCrop} Season <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              {new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })} <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              {displayLocation}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#0a1a11] px-5 py-3 rounded-full border border-green-800/40 backdrop-blur-sm">
             <MapIcon className="text-lime-400" size={20} />
             <span className="font-medium text-green-100">Farm A: Active</span>
          </div>
        </div>
      </div>

      {/* 3. Live Price Ticker */}
      <div className="flex bg-[#0f2318] border-y border-green-900/40 py-3 overflow-hidden mb-8 shadow-lg">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] items-center text-sm md:text-base font-medium">
          <span className="mx-6 flex items-center gap-2">Wheat <span className="text-green-100">₹2,125</span> <span className="text-lime-400">▲+45</span></span>
          <span className="text-green-900/50">|</span>
          <span className="mx-6 flex items-center gap-2">Rice <span className="text-green-100">₹2,183</span> <span className="text-red-400">▼-12</span></span>
          <span className="text-green-900/50">|</span>
          <span className="mx-6 flex items-center gap-2">Cotton <span className="text-green-100">₹6,234</span> <span className="text-lime-400">▲+156</span></span>
          <span className="text-green-900/50">|</span>
          <span className="mx-6 flex items-center gap-2">Soybean <span className="text-green-100">₹4,521</span> <span className="text-red-400">▼-89</span></span>
          <span className="text-green-900/50">|</span>
          <span className="mx-6 flex items-center gap-2">Onion <span className="text-green-100">₹1,890</span> <span className="text-lime-400">▲+234</span></span>
          <span className="text-green-900/50">|</span>
          <span className="mx-6 flex items-center gap-2">Potato <span className="text-green-100">₹1,245</span> <span className="text-lime-400">▲+78</span></span>
        </div>
      </div>

      {/* 2. StatCards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Total Land", value: displayLand, icon: <MapIcon size={20}/>, color: "text-green-400", bg: "bg-green-400/10" },
          { label: "Expected Yield", value: "48.2 qtl", icon: <TrendingUp size={20}/>, color: "text-lime-400", bg: "bg-lime-400/10" },
          { label: "Crop Health", value: "87%", icon: <Activity size={20}/>, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Active Alerts", value: "3", icon: <AlertTriangle size={20}/>, color: "text-amber-400", bg: "bg-amber-400/10", alert: true },
          { label: "Market Value", value: "₹2,45,000", icon: <Wallet size={20}/>, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { label: "Scheme Benefits", value: "₹18,500", icon: <Landmark size={20}/>, color: "text-blue-400", bg: "bg-blue-400/10" }
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-2xl bg-[#0f2318] border border-green-900/30 hover:border-green-700/50 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] ${stat.alert ? 'cursor-pointer hover:bg-[#1a3324]' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-green-100/60 text-sm mb-1">{stat.label}</p>
            <h3 className="text-xl font-bold text-green-50">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
        
        {/* Main Left Column */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* 5. Yield History Chart */}
          <div className="bg-[#0f2318] rounded-2xl border border-green-900/30 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2"><BarChart2 className="text-lime-400"/> Yield History (Quintals)</h2>
              <select className="bg-[#0a1810] border border-green-800/50 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-lime-500/50">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a3e635" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#166534" tick={{fill: '#86efac', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#166534" tick={{fill: '#86efac', fontSize: 12}} axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f2318', borderColor: '#14532d', borderRadius: '12px', color: '#f0fdf4' }}
                    itemStyle={{ color: '#a3e635' }}
                  />
                  <Area type="monotone" dataKey="wheat" stroke="#a3e635" strokeWidth={3} fillOpacity={1} fill="url(#colorWheat)" />
                  <Area type="monotone" dataKey="rice" stroke="#4ade80" strokeWidth={3} fillOpacity={1} fill="url(#colorRice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. Weather widget inline */}
          <div className="bg-gradient-to-r from-blue-900/20 to-[#0f2318] rounded-2xl border border-blue-900/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Sun className="text-amber-400 w-16 h-16 animate-[spin_10s_linear_infinite]" />
                <Cloud className="text-blue-200 w-10 h-10 absolute bottom-0 -right-2 bg-[#0f2318] rounded-full p-1" />
              </div>
              <div>
                <h3 className="text-4xl font-bold flex items-center gap-2">32°C <span className="text-xl font-normal text-blue-200">Partly Cloudy</span></h3>
                <p className="text-blue-300/80 mt-1 flex items-center gap-1"><MapIcon size={14}/> {displayLocation}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end text-sm text-blue-100/80">
              <div className="flex items-center gap-2 bg-blue-950/40 px-4 py-2 rounded-xl"><Droplets size={16} className="text-blue-400"/> Humidity 68%</div>
              <div className="flex items-center gap-2 bg-blue-950/40 px-4 py-2 rounded-xl"><Wind size={16} className="text-blue-400"/> Wind 12 km/h</div>
              <div className="flex items-center gap-2 bg-blue-950/40 px-4 py-2 rounded-xl"><CloudRain size={16} className="text-blue-400"/> Rain chance: 20%</div>
            </div>
          </div>

          {/* 11. Farm Map Placeholder */}
          <div className="bg-[#0f2318] rounded-2xl border border-green-900/30 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2"><MapIcon className="text-lime-400"/> Farm Zones</h2>
              <button className="text-sm text-lime-400 hover:text-lime-300 flex items-center">View Map <ChevronRight size={16}/></button>
            </div>
            <div className="h-64 rounded-xl bg-[#0a150e] border border-green-900/50 p-4 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
              <div className="w-full h-full flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-green-500/20 border-2 border-green-500/50 rounded-lg flex items-center justify-center hover:bg-green-500/30 transition-colors cursor-pointer group/zone">
                  <div className="text-center">
                    <span className="font-bold text-lg text-green-300 block">Field A</span>
                    <span className="text-xs text-green-400/80 bg-green-900/40 px-2 py-1 rounded-full mt-2 inline-block">Wheat • Healthy</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex-1 bg-amber-500/20 border-2 border-amber-500/50 rounded-lg flex items-center justify-center hover:bg-amber-500/30 transition-colors cursor-pointer group/zone">
                    <div className="text-center">
                      <span className="font-bold text-lg text-amber-300 block">Field B</span>
                      <span className="text-xs text-amber-400/80 bg-amber-900/40 px-2 py-1 rounded-full mt-2 inline-block">Tomato • Warning</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-lime-500/20 border-2 border-lime-500/50 rounded-lg flex items-center justify-center hover:bg-lime-500/30 transition-colors cursor-pointer group/zone">
                    <div className="text-center">
                      <span className="font-bold text-lg text-lime-300 block">Field C</span>
                      <span className="text-xs text-lime-400/80 bg-lime-900/40 px-2 py-1 rounded-full mt-2 inline-block">Prepared</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          
          {/* 9. AI Daily Tip */}
          <div className="bg-gradient-to-br from-lime-900/20 to-[#0f2318] rounded-2xl border border-lime-900/40 p-6 relative overflow-hidden shadow-[0_0_20px_rgba(163,230,53,0.05)]">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Zap size={64} className="text-lime-400" />
            </div>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-lime-300">
              <Zap size={20} className="fill-lime-400" /> AI Daily Tip
            </h2>
            <div className="min-h-[80px] flex items-center">
              <p className="text-green-100 text-lg leading-relaxed animate-[fadeIn_0.5s_ease-in-out]">
                {tips[currentTipIndex]}
              </p>
            </div>
            <div className="flex gap-2 mt-6 justify-center">
              {tips.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentTipIndex ? 'w-6 bg-lime-400' : 'w-2 bg-lime-900'}`} />
              ))}
            </div>
          </div>

          {/* 8. Quick Actions */}
          <div className="bg-[#0f2318] rounded-2xl border border-green-900/30 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-green-300">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Camera size={20}/>, label: "Detect", to: "/disease-detection", color: "text-rose-400", bg: "bg-rose-400/10" },
                { icon: <Cloud size={20}/>, label: "Weather", to: "/weather-intelligence", color: "text-blue-400", bg: "bg-blue-400/10" },
                { icon: <TrendingUp size={20}/>, label: "Yield", to: "/yield-prediction", color: "text-lime-400", bg: "bg-lime-400/10" },
                { icon: <Wallet size={20}/>, label: "Market", to: "#", color: "text-amber-400", bg: "bg-amber-400/10" },
                { icon: <Landmark size={20}/>, label: "Schemes", to: "#", color: "text-indigo-400", bg: "bg-indigo-400/10" },
                { icon: <Leaf size={20}/>, label: "Crops", to: "#", color: "text-green-400", bg: "bg-green-400/10" },
              ].map((action, i) => (
                <Link to={action.to} key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-green-800/20 border border-transparent hover:border-green-800/50 transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <span className="text-xs font-medium text-green-100/80">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* 6. Recent Disease Alerts */}
          <div className="bg-[#0f2318] rounded-2xl border border-rose-900/30 p-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-rose-300">
              <ShieldAlert size={20} /> Active Alerts
            </h2>
            <div className="space-y-4">
              <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-4 flex gap-4 hover:bg-rose-950/50 transition-colors">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute"></div>
                  <div className="w-2 h-2 rounded-full bg-rose-500 relative"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-200">Tomato Late Blight</h4>
                  <p className="text-sm text-rose-300/70 mt-1 flex gap-2">Field B <span className="bg-rose-900/50 px-2 rounded-full text-xs flex items-center text-rose-200 border border-rose-800">HIGH SEVERITY</span></p>
                  <p className="text-xs text-rose-400/50 mt-2">2 hours ago</p>
                </div>
              </div>
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-4 flex gap-4 hover:bg-amber-950/50 transition-colors">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500 relative"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-200">Wheat Rust</h4>
                  <p className="text-sm text-amber-300/70 mt-1 flex gap-2">Field A <span className="bg-amber-900/50 px-2 rounded-full text-xs flex items-center text-amber-200 border border-amber-800">MODERATE</span></p>
                  <p className="text-xs text-amber-400/50 mt-2">Yesterday</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 text-sm text-rose-400 hover:text-rose-300 py-2 border border-rose-900/50 rounded-lg hover:bg-rose-950/30 transition-colors">View All Alerts</button>
          </div>

          {/* 7. Active Government Schemes */}
          <div className="bg-[#0f2318] rounded-2xl border border-indigo-900/30 p-6 shadow-lg">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4 text-indigo-300">
              <Landmark size={20} /> Active Schemes
            </h2>
            <div className="space-y-3">
              {[
                { name: "PM-KISAN", desc: "Next installment ₹2,000 on Aug 1", icon: <Landmark size={16}/> },
                { name: "PMFBY", desc: "Policy active until Dec 2026", icon: <ShieldAlert size={16}/> },
                { name: "KCC", desc: "Loan limit ₹1.2L available", icon: <Wallet size={16}/> },
              ].map((scheme, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#0a1810] border border-indigo-900/20 hover:border-indigo-800/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400">
                    {scheme.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-100">{scheme.name}</h4>
                    <p className="text-xs text-indigo-300/60 mt-0.5">{scheme.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
