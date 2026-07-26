import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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

// Default fallback location: Pune, Maharashtra
const DEFAULT_COORDS = { lat: 18.5204, lon: 73.8567 };

interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  conditions: string;
  description: string;
  icon: string;
  windSpeed: number;
  pressure: number;
  visibility: number | null;
  dewPoint: number;
  aqi: number | null;
}

interface HourlySlot {
  time: string;
  temp: number;
  conditions: string;
  icon: string;
  pop: number;
}

interface DailySlot {
  date: string;
  day: string;
  tempMax: number;
  tempMin: number;
  conditions: string;
  pop: number;
}

interface WeatherResponse {
  location: { lat: number; lon: number; name: string };
  current: CurrentWeather;
  hourly: HourlySlot[];
  daily: DailySlot[];
  updatedAt: string;
}

const AQI_LABELS: Record<number, string> = {
  1: 'Good',
  2: 'Fair',
  3: 'Moderate',
  4: 'Poor',
  5: 'Very Poor',
};

function WeatherIcon({ conditions, size = 40, className = '' }: { conditions: string; size?: number; className?: string }) {
  const c = (conditions || '').toLowerCase();
  if (c.includes('thunder')) return <CloudLightning size={size} className={className || 'text-indigo-400'} />;
  if (c.includes('rain') || c.includes('drizzle')) return <CloudRain size={size} className={className || 'text-blue-400'} />;
  if (c.includes('cloud')) return <Cloud size={size} className={className || 'text-gray-300'} />;
  return <Sun size={size} className={className || 'text-amber-400'} />;
}

export default function WeatherIntelligence() {
  const [isCelsius, setIsCelsius] = useState(true);
  const [location, setLocation] = useState({ name: 'Detecting location...', coords: '' });
  const [isLocating, setIsLocating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get<WeatherResponse>(`/api/weather/${lat}/${lon}`);
      setWeather(res.data);
      setLocation({
        name: res.data.location.name,
        coords: `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`,
      });
    } catch (err) {
      setError('Could not fetch live weather. Showing may be unavailable.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    navigator.permissions?.query({ name: 'geolocation' as PermissionName }).then((result) => {
      if (result.state === 'granted') {
        handleLocate();
      } else {
        fetchWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
      }
    }).catch(() => {
      fetchWeather(DEFAULT_COORDS.lat, DEFAULT_COORDS.lon);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocate = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setIsLocating(false);
          const { latitude, longitude } = position.coords;
          await fetchWeather(latitude, longitude);
          setToastMsg('✅ Location detected');
          setTimeout(() => setToastMsg(''), 3000);
        },
        () => {
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

  const toF = (c: number) => Math.round((c * 9) / 5 + 32);
  const displayTemp = (c: number) => (isCelsius ? Math.round(c) : toF(c));

  const current = weather?.current;
  const aqiLabel = current?.aqi ? AQI_LABELS[current.aqi] || 'Unknown' : null;

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-4 md:p-6 lg:p-8 font-sans overflow-x-hidden">
      {toastMsg && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
          {toastMsg}
        </div>
      )}

      {error && (
        <div className="mb-6 bg-rose-950/40 border border-rose-800/60 text-rose-200 px-4 py-3 rounded-xl text-sm">
          {error}
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
            <span className="flex items-center gap-1">
              <RefreshCw size={12}/> {weather ? `Updated: ${new Date(weather.updatedAt).toLocaleTimeString()}` : 'Loading...'}
            </span>
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
                <WeatherIcon conditions={current?.conditions || ''} size={100} />
              </div>
              <div>
                <div className="flex items-start">
                  <h2 className="text-7xl font-bold tracking-tighter text-white">
                    {current ? displayTemp(current.temperature) : '--'}
                  </h2>
                  <div className="flex flex-col ml-2 mt-2">
                    <button onClick={() => setIsCelsius(true)} className={`text-xl font-bold ${isCelsius ? 'text-white' : 'text-blue-300/50'}`}>°C</button>
                    <button onClick={() => setIsCelsius(false)} className={`text-xl font-bold ${!isCelsius ? 'text-white' : 'text-blue-300/50'}`}>°F</button>
                  </div>
                </div>
                <p className="text-2xl text-blue-200 mt-2 font-medium capitalize">{current?.description || (loading ? 'Loading...' : '—')}</p>
                {aqiLabel && (
                  <div className="mt-4 flex items-center gap-3">
                    <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/30">
                      AQI: {current?.aqi} ({aqiLabel})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm bg-[#081824]/50 p-6 rounded-2xl border border-blue-900/20 backdrop-blur-sm grow">
              <div className="flex items-center gap-3 text-blue-100/80">
                <Thermometer size={20} className="text-amber-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Feels Like</p><p className="font-semibold text-base text-white">{current ? `${displayTemp(current.feelsLike)}°${isCelsius ? 'C' : 'F'}` : '--'}</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <Droplets size={20} className="text-blue-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Humidity</p><p className="font-semibold text-base text-white">{current ? `${current.humidity}%` : '--'}</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <Wind size={20} className="text-gray-300/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Wind</p><p className="font-semibold text-base text-white">{current ? `${current.windSpeed} km/h` : '--'}</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <Eye size={20} className="text-purple-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Visibility</p><p className="font-semibold text-base text-white">{current?.visibility != null ? `${current.visibility} km` : '--'}</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <Droplets size={20} className="text-indigo-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Dew Point</p><p className="font-semibold text-base text-white">{current ? `${displayTemp(current.dewPoint)}°${isCelsius ? 'C' : 'F'}` : '--'}</p></div>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <ArrowDown size={20} className="text-emerald-400/80"/> 
                <div><p className="text-xs text-blue-300/50 uppercase">Pressure</p><p className="font-semibold text-base text-white">{current ? `${current.pressure} hPa` : '--'}</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. AI Farming Advisories (illustrative, rule-of-thumb tips) */}
        <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl flex flex-col">
          <h3 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-lime-400 fill-lime-400" /> AI Advisories
          </h3>
          <div className="space-y-3 grow flex flex-col justify-between">
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-xl p-3 flex gap-3">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-100/90 leading-relaxed">
                {weather && weather.daily.some(d => d.pop > 50)
                  ? 'Rain expected soon - consider delaying heavy irrigation.'
                  : 'No significant rain forecasted - irrigation recommended today.'}
              </p>
            </div>
            <div className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-3 flex gap-3">
              <Wind size={18} className="text-rose-500 shrink-0 mt-0.5" />
              <p className="text-sm text-rose-100/90 leading-relaxed">
                {current && current.windSpeed > 20
                  ? `High wind (${current.windSpeed} km/h) - avoid pesticide spraying today.`
                  : 'Wind speeds are low - good conditions for pesticide application.'}
              </p>
            </div>
            <div className="bg-lime-950/30 border border-lime-900/50 rounded-xl p-3 flex gap-3">
              <Calendar size={18} className="text-lime-500 shrink-0 mt-0.5" />
              <p className="text-sm text-lime-100/90 leading-relaxed">Check the 7-day outlook before planning sowing windows.</p>
            </div>
            <div className="bg-blue-950/30 border border-blue-900/50 rounded-xl p-3 flex gap-3">
              <Droplets size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-100/90 leading-relaxed">
                {current ? `Humidity at ${current.humidity}% - adjust irrigation accordingly.` : 'Loading soil guidance...'}
              </p>
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
            {(weather?.hourly || []).map((item, i) => (
              <div key={i} className={`flex flex-col items-center justify-between min-w-[80px] p-4 rounded-2xl ${i===0 ? 'bg-blue-900/30 border border-blue-800/50' : 'bg-[#0a1810] border border-green-900/20'}`}>
                <span className="text-sm font-medium text-green-300/80 mb-3">{i === 0 ? 'Now' : item.time}</span>
                <div className="mb-3"><WeatherIcon conditions={item.conditions} size={24} /></div>
                <span className="text-xl font-bold text-white mb-2">{displayTemp(item.temp)}°</span>
                <span className="text-xs text-blue-400 font-medium flex items-center"><Droplets size={10} className="mr-1"/>{item.pop}%</span>
              </div>
            ))}
            {!weather && loading && <p className="text-green-400/60 text-sm">Loading hourly forecast...</p>}
          </div>
        </div>

        {/* 3. 7-Day Forecast */}
        <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
          <h3 className="text-lg font-bold text-green-200 mb-6 flex items-center gap-2">Daily Outlook</h3>
          <div className="space-y-2">
            {(weather?.daily || []).map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-[#0a1810] rounded-xl transition-colors border border-transparent hover:border-green-900/30">
                <span className="w-16 font-medium text-green-100">{i === 0 ? 'Today' : item.day}</span>
                <div className="flex items-center gap-4 flex-1 justify-center">
                  <WeatherIcon conditions={item.conditions} size={20} />
                  <span className="text-sm text-green-300/80 w-24 hidden md:block">{item.conditions}</span>
                </div>
                <span className="w-16 text-xs text-blue-400 font-medium text-center">{item.pop}%</span>
                <div className="w-24 flex justify-end gap-3 text-sm font-medium">
                  <span className="text-white">{displayTemp(item.tempMax)}°</span>
                  <span className="text-green-500/50">{displayTemp(item.tempMin)}°</span>
                </div>
              </div>
            ))}
            {!weather && loading && <p className="text-green-400/60 text-sm">Loading forecast...</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 6. Rainfall chart - illustrative sample data (historical rainfall needs a separate paid data source) */}
        <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
          <h3 className="text-lg font-bold text-green-200 mb-2 flex items-center gap-2">Rainfall History (Last 15 Days)</h3>
          <p className="text-xs text-green-500/50 mb-4">Sample data — live historical rainfall requires a paid data source</p>
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

        {/* 7 & 8. Ag Parameters & Crop Calendar - illustrative (need specialized agri-data APIs for live values) */}
        <div className="space-y-6">
          <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-green-200 mb-1 flex items-center gap-2">Agri-Weather Parameters</h3>
            <p className="text-xs text-green-500/50 mb-4">Dew point is live; other values are illustrative</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0a1810] p-4 rounded-2xl border border-amber-900/20">
                <p className="text-xs text-amber-400/80 uppercase font-semibold mb-1">Soil Temp (5cm, est.)</p>
                <p className="text-2xl font-bold text-amber-100">{current ? `${displayTemp(current.temperature - 3)}°${isCelsius ? 'C' : 'F'}` : '--'}</p>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><Info size={12}/> Optimal: Wheat, Rice</p>
              </div>
              <div className="bg-[#0a1810] p-4 rounded-2xl border border-blue-900/20">
                <p className="text-xs text-blue-400/80 uppercase font-semibold mb-1">Evapotranspiration</p>
                <p className="text-2xl font-bold text-blue-100">5.2 <span className="text-sm font-normal text-blue-300/60">mm/day</span></p>
                <p className="text-xs text-blue-400 mt-2 flex items-center gap-1"><Droplets size={12}/> High evaporation</p>
              </div>
              <div className="bg-[#0a1810] p-4 rounded-2xl border border-indigo-900/20">
                <p className="text-xs text-indigo-400/80 uppercase font-semibold mb-1">Dew Point (live)</p>
                <p className="text-2xl font-bold text-indigo-100">{current ? `${displayTemp(current.dewPoint)}°${isCelsius ? 'C' : 'F'}` : '--'}</p>
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1"><AlertTriangle size={12}/> Disease risk: {current && current.dewPoint > 20 ? 'Med-High' : 'Low'}</p>
              </div>
              <div className="bg-[#0a1810] p-4 rounded-2xl border border-lime-900/20">
                <p className="text-xs text-lime-400/80 uppercase font-semibold mb-1">Growing Degree Days</p>
                <p className="text-2xl font-bold text-lime-100">{current ? ((current.temperature + (weather?.daily[0]?.tempMin || current.temperature)) / 2 - 10).toFixed(1) : '--'}</p>
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
