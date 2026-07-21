import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  MapPin, 
  RefreshCw, 
  Navigation,
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye, 
  Zap, 
  AlertTriangle, 
  Calendar, 
  Info, 
  CloudLightning,
  ChevronRight,
  ArrowDown
} from 'lucide-react';

const rainData = [
  { day: '05 Jul', amount: 0 },
  { day: '06 Jul', amount: 12 },
  { day: '07 Jul', amount: 45 },
  { day: '08 Jul', amount: 23 },
  { day: '09 Jul', amount: 5 },
  { day: '10 Jul', amount: 0 },
  { day: '11 Jul', amount: 0 },
  { day: '12 Jul', amount: 0 },
  { day: '13 Jul', amount: 8 },
  { day: '14 Jul', amount: 15 },
  { day: '15 Jul', amount: 32 },
  { day: '16 Jul', amount: 10 },
  { day: '17 Jul', amount: 0 },
  { day: '18 Jul', amount: 0 },
  { day: '19 Jul', amount: 2 },
];

export default function WeatherIntelligence() {
  const [isCelsius, setIsCelsius] = useState(true);
  const [location, setLocation] = useState({ name: 'Pune, Maharashtra', coords: '18.5204°N, 73.8567°E' });
  const [isLocating, setIsLocating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    navigator.permissions?.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        handleLocate();
      }
    });
  }, []);

  const handleLocate = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          // Mock reverse geocoding
          setLocation({
            name: 'Pune, Maharashtra',
            coords: `${position.coords.latitude.toFixed(4)}°N, ${position.coords.longitude.toFixed(4)}°E`
          });
          setToastMsg('✅ Location detected: Pune, Maharashtra');
          setTimeout(() => setToastMsg(''), 3000);
        },
        (error) => {
          setIsLocating(false);
          setToastMsg('❌ Location access denied. Please enable GPS.');
          setTimeout(() => setToastMsg(''), 3000);
        }
      );
    } else {
      setIsLocating(false);
      setToastMsg('❌ Geolocation is not supported by your browser.');
      setTimeout(() => setToastMsg(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-4 md:p-6 lg:p-8 font-sans overflow-x-hidden">
      {toastMsg && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
          {toastMsg}
        </div>
      )}
      
      {/* 1. Location header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
            <MapPin className="text-blue-400" size={32} /> {location.name}
          </h1>
          <p className="text-green-300/60 mt-1 flex items-center gap-3 text-sm">
            <span>{location.coords}</span>
            <span className="w-1 h-1 rounded-full bg-green-500/50"></span>
            <span className="flex items-center gap-1"><RefreshCw size={12}/> Updated: Just now</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleLocate} 
            disabled={isLocating} 
            className="bg-[#153022] hover:bg-[#1a3d2a] border border-green-700/50 px-4 py-2 rounded-xl text-sm font-medium transition-colors text-green-100 flex items-center gap-2"
          >
            {isLocating ? <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div> : <Navigation size={16} />}
            Detect My Location
          </button>
          <button className="bg-[#0f2318] hover:bg-[#153022] border border-green-800/50 px-4 py-2 rounded-xl text-sm font-medium transition-colors text-green-300">
            Change Location
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* 2. Current Weather Hero card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#0c2436] to-[#051119] rounded-3xl border border-blue-900/30 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            {/* Main Temp */}
            <div className="flex items-center gap-8">
              <div className="relative">
                <Sun size={100} className="text-amber-400 animate-[spin_12s_linear_infinite]" />
                <Cloud size={60} className="text-blue-100 absolute -bottom-4 -right-4 drop-shadow-xl" fill="currentColor" />
              </div>
              <div>
                <div className="flex items-start">
                  <h2 className="text-7xl font-bold tracking-tighter text-white">{isCelsius ? '32' : '90'}</h2>
                  <div className="flex flex-col ml-2 mt-2">
                    <button onClick={() => setIsCelsius(true)} className={`text-xl font-bold ${isCelsius ? 'text-white' : 'text-blue-300/50'}`}>°C</button>
                    <button onClick={() => setIsCelsius(false)} className={`text-xl font-bold ${!isCelsius ? 'text-white' : 'text-blue-300/50'}`}>°F</button>
                  </div>
                </div>
                <p className="text-2xl text-blue-200 mt-2 font-medium">Partly Cloudy</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30">AQI: 89 (Moderate)</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm bg-[#081824]/50 p-6 rounded-2xl border border-blue-900/20 backdrop-blur-sm grow">
              <div className="flex items-center gap-3 text-blue-100/80">
                <Thermometer size={20} className="text-amber-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Feels Like</p><p className="font-semibold text-base text-white">{isCelsius ? '35°C' : '95°F'}</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <Droplets size={20} className="text-blue-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Humidity</p><p className="font-semibold text-base text-white">68%</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <Wind size={20} className="text-gray-300/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Wind (NW)</p><p className="font-semibold text-base text-white">12 km/h</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <Eye size={20} className="text-purple-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Visibility</p><p className="font-semibold text-base text-white">8 km</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <Sun size={20} className="text-yellow-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">UV Index</p><p className="font-semibold text-base text-yellow-400">7 (High)</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <ArrowDown size={20} className="text-emerald-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Pressure</p><p className="font-semibold text-base text-white">1012 hPa</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. AI Farming Advisories */}
        <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-lime-400 fill-lime-400" /> AI Advisories
          </h3>
          <div className="space-y-3 grow flex flex-col justify-between">
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3 flex gap-3">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-100/90 leading-relaxed">Irrigation recommended today - no rain forecasted for the next 3 days.</p>
            </div>
            <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-3 flex gap-3">
              <Wind size={18} className="text-rose-500 shrink-0 mt-0.5" />
              <p className="text-sm text-rose-100/90 leading-relaxed">High wind tomorrow (25km/h) - avoid scheduled pesticide spraying.</p>
            </div>
            <div className="bg-lime-950/30 border border-lime-900/50 rounded-xl p-3 flex gap-3">
              <Calendar size={18} className="text-lime-500 shrink-0 mt-0.5" />
              <p className="text-sm text-lime-100/90 leading-relaxed">Next week ideal for wheat sowing - highly favorable temp and soil moisture.</p>
            </div>
            <div className="bg-blue-950/30 border border-blue-900/50 rounded-xl p-3 flex gap-3">
              <Droplets size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-100/90 leading-relaxed">Soil moisture adequate. Reduce planned irrigation by 30%.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 & 4. Forecasts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        
        {/* 4. Hourly Forecast */}
        <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
          <h3 className="text-lg font-bold text-green-200 mb-6 flex items-center gap-2">Hourly Forecast</h3>
          <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-transparent">
            {[
              { time: "Now", temp: "32°", icon: <Sun className="text-amber-400"/>, rain: "0%" },
              { time: "14:00", temp: "33°", icon: <Sun className="text-amber-400"/>, rain: "0%" },
              { time: "15:00", temp: "34°", icon: <Cloud className="text-gray-300"/>, rain: "10%" },
              { time: "16:00", temp: "33°", icon: <Cloud className="text-gray-300"/>, rain: "20%" },
              { time: "17:00", temp: "31°", icon: <CloudRain className="text-blue-400"/>, rain: "60%" },
              { time: "18:00", temp: "29°", icon: <CloudRain className="text-blue-400"/>, rain: "80%" },
              { time: "19:00", temp: "28°", icon: <CloudRain className="text-blue-400"/>, rain: "50%" },
              { time: "20:00", temp: "27°", icon: <Cloud className="text-gray-300"/>, rain: "20%" },
              { time: "21:00", temp: "26°", icon: <Cloud className="text-gray-400"/>, rain: "10%" },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col items-center justify-between min-w-[80px] p-4 rounded-2xl ${i===0 ? 'bg-blue-900/30 border border-blue-800/50' : 'bg-[#0a1810] border border-green-900/20'}`}>
                <span className="text-sm font-medium text-green-300/80 mb-3">{item.time}</span>
                <div className="mb-3">{item.icon}</div>
                <span className="text-xl font-bold text-white mb-2">{item.temp}</span>
                <span className="text-xs text-blue-400 font-medium flex items-center"><Droplets size={10} className="mr-1"/>{item.rain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 7-Day Forecast */}
        <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
          <h3 className="text-lg font-bold text-green-200 mb-6 flex items-center gap-2">7-Day Outlook</h3>
          <div className="space-y-2">
            {[
              { day: "Today", tempH: "34°", tempL: "26°", icon: <Sun size={20} className="text-amber-400"/>, desc: "Mostly Sunny", rain: "20%" },
              { day: "Mon", tempH: "31°", tempL: "24°", icon: <CloudRain size={20} className="text-blue-400"/>, desc: "Showers", rain: "70%" },
              { day: "Tue", tempH: "28°", tempL: "22°", icon: <CloudLightning size={20} className="text-indigo-400"/>, desc: "Thunderstorms", rain: "90%" },
              { day: "Wed", tempH: "30°", tempL: "23°", icon: <Cloud size={20} className="text-gray-300"/>, desc: "Cloudy", rain: "40%" },
              { day: "Thu", tempH: "33°", tempL: "25°", icon: <Sun size={20} className="text-amber-400"/>, desc: "Sunny", rain: "10%" },
              { day: "Fri", tempH: "35°", tempL: "27°", icon: <Sun size={20} className="text-amber-400"/>, desc: "Hot & Sunny", rain: "0%" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-[#0a1810] rounded-xl transition-colors border border-transparent hover:border-green-900/30">
                <span className="w-16 font-medium text-green-100">{item.day}</span>
                <div className="flex items-center gap-4 flex-1 justify-center">
                  {item.icon}
                  <span className="text-sm text-green-300/80 w-24 hidden md:block">{item.desc}</span>
                </div>
                <span className="w-16 text-xs text-blue-400 font-medium text-center">{item.rain}</span>
                <div className="w-24 flex justify-end gap-3 text-sm font-medium">
                  <span className="text-white">{item.tempH}</span>
                  <span className="text-green-500/50">{item.tempL}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 6. Rainfall chart */}
        <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
          <h3 className="text-lg font-bold text-green-200 mb-6 flex items-center gap-2">Rainfall History (Last 15 Days)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                <XAxis dataKey="day" stroke="#166534" tick={{fill: '#86efac', fontSize: 10}} axisLine={false} tickLine={false} />
                <YAxis stroke="#166534" tick={{fill: '#86efac', fontSize: 10}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#064e3b', opacity: 0.4}}
                  contentStyle={{ backgroundColor: '#0f2318', borderColor: '#1e3a8a', borderRadius: '12px', color: '#f0fdf4' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Bar dataKey="amount" name="Rainfall (mm)" radius={[4, 4, 0, 0]}>
                  {rainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.amount > 20 ? '#3b82f6' : '#60a5fa'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7 & 8. Ag Parameters & Crop Calendar */}
        <div className="space-y-6">
          <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-green-200 mb-4 flex items-center gap-2">Agri-Weather Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0a1810] p-4 rounded-2xl border border-amber-900/20">
                <p className="text-xs text-amber-400/80 uppercase font-semibold mb-1">Soil Temp (5cm)</p>
                <p className="text-2xl font-bold text-amber-100">28°C</p>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><Info size={12}/> Optimal: Wheat, Rice</p>
              </div>
              <div className="bg-[#0a1810] p-4 rounded-2xl border border-blue-900/20">
                <p className="text-xs text-blue-400/80 uppercase font-semibold mb-1">Evapotranspiration</p>
                <p className="text-2xl font-bold text-blue-100">5.2 <span className="text-sm font-normal text-blue-300/60">mm/day</span></p>
                <p className="text-xs text-blue-400 mt-2 flex items-center gap-1"><Droplets size={12}/> High evaporation</p>
              </div>
              <div className="bg-[#0a1810] p-4 rounded-2xl border border-indigo-900/20">
                <p className="text-xs text-indigo-400/80 uppercase font-semibold mb-1">Dew Point</p>
                <p className="text-2xl font-bold text-indigo-100">21°C</p>
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1"><AlertTriangle size={12}/> Disease risk: Med</p>
              </div>
              <div className="bg-[#0a1810] p-4 rounded-2xl border border-lime-900/20">
                <p className="text-xs text-lime-400/80 uppercase font-semibold mb-1">Growing Degree Days</p>
                <p className="text-2xl font-bold text-lime-100">18.4</p>
                <p className="text-xs text-lime-400 mt-2 flex items-center gap-1"><Calendar size={12}/> Accumulated today</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
             <h3 className="text-lg font-bold text-green-200 mb-4 flex items-center gap-2">Weather-Based Crop Calendar</h3>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                 <thead className="text-xs text-green-400/60 uppercase border-b border-green-900/40">
                   <tr>
                     <th className="pb-2 font-medium">Crop</th>
                     <th className="pb-2 font-medium">Window</th>
                     <th className="pb-2 font-medium text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-green-900/20">
                   <tr>
                     <td className="py-3 font-medium text-green-100">Kharif Rice</td>
                     <td className="py-3 text-green-300/80">Jun 15 - Jul 30</td>
                     <td className="py-3 text-right"><span className="bg-lime-900/40 text-lime-400 px-2 py-1 rounded text-xs border border-lime-800/50">Optimal Sowing</span></td>
                   </tr>
                   <tr>
                     <td className="py-3 font-medium text-green-100">Soybean</td>
                     <td className="py-3 text-green-300/80">Jun 20 - Jul 15</td>
                     <td className="py-3 text-right"><span className="bg-amber-900/40 text-amber-400 px-2 py-1 rounded text-xs border border-amber-800/50">Window Closing</span></td>
                   </tr>
                   <tr>
                     <td className="py-3 font-medium text-green-100">Rabi Wheat</td>
                     <td className="py-3 text-green-300/80">Nov 01 - Dec 15</td>
                     <td className="py-3 text-right"><span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs">Waiting</span></td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
