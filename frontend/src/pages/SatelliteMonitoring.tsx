import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Map, Layers, Navigation, ZoomIn, ZoomOut, Upload, AlertTriangle, AlertCircle, Info, CheckCircle, Crosshair } from 'lucide-react';

const ndviData = [
  { week: 'W1', fieldA: 0.82, fieldB: 0.75, fieldC: 0.65 },
  { week: 'W2', fieldA: 0.84, fieldB: 0.76, fieldC: 0.64 },
  { week: 'W3', fieldA: 0.85, fieldB: 0.74, fieldC: 0.62 },
  { week: 'W4', fieldA: 0.83, fieldB: 0.73, fieldC: 0.60 },
  { week: 'W5', fieldA: 0.81, fieldB: 0.70, fieldC: 0.58 },
  { week: 'W6', fieldA: 0.80, fieldB: 0.68, fieldC: 0.55 },
  { week: 'W7', fieldA: 0.78, fieldB: 0.66, fieldC: 0.52 },
  { week: 'W8', fieldA: 0.77, fieldB: 0.64, fieldC: 0.48 },
  { week: 'W9', fieldA: 0.79, fieldB: 0.62, fieldC: 0.45 },
  { week: 'W10', fieldA: 0.81, fieldB: 0.61, fieldC: 0.42 },
  { week: 'W11', fieldA: 0.84, fieldB: 0.63, fieldC: 0.38 },
  { week: 'W12', fieldA: 0.85, fieldB: 0.65, fieldC: 0.35 },
];

export default function SatelliteMonitoring() {
  const [activeLayer, setActiveLayer] = useState('NDVI');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const layers = ['Satellite', 'NDVI', 'Thermal', 'True Color'];

  const handleUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-6 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 mb-1">
            <span>📷</span> Satellite & Drone Monitoring
          </h1>
          <p className="text-green-500 flex items-center gap-2 text-sm">
            <Crosshair className="w-4 h-4" /> Coordinates: 18.5204°N, 73.8567°E
          </p>
        </div>
        <div className="flex bg-[#0f2318] rounded-lg p-1 border border-green-900/30">
          {layers.map(l => (
            <button 
              key={l}
              onClick={() => setActiveLayer(l)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeLayer === l ? 'bg-green-600 text-white' : 'text-green-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" /> {l}
            </button>
          ))}
        </div>
      </header>

      {/* Map Area */}
      <div className="relative w-full h-[600px] bg-[#0a1510] rounded-xl border border-green-900/50 mb-8 overflow-hidden group">
        {/* CSS Grid Background for map feel */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Field Zones */}
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[35%] bg-green-600/40 border-2 border-green-500/80 rounded-lg flex items-center justify-center hover:bg-green-600/60 transition-all cursor-pointer backdrop-blur-sm">
          <div className="bg-black/70 px-3 py-1 rounded text-sm font-bold text-green-300">Field A 4.2 ac | 89%</div>
        </div>
        
        <div className="absolute top-[15%] right-[10%] w-[35%] h-[40%] bg-amber-500/40 border-2 border-amber-500/80 rounded-lg flex items-center justify-center hover:bg-amber-500/60 transition-all cursor-pointer backdrop-blur-sm" style={{ transform: 'rotate(5deg)' }}>
          <div className="bg-black/70 px-3 py-1 rounded text-sm font-bold text-amber-300">Field B 3.8 ac | 72%</div>
        </div>
        
        <div className="absolute bottom-[10%] left-[20%] w-[50%] h-[30%] bg-red-500/40 border-2 border-red-500/80 rounded-lg flex items-center justify-center hover:bg-red-500/60 transition-all cursor-pointer backdrop-blur-sm">
          <div className="bg-black/70 px-3 py-1 rounded text-sm font-bold text-red-300">Field C 4.5 ac | 56%</div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-[#0f2318]/90 p-2 rounded-lg border border-green-900/50 backdrop-blur-md">
            <button className="p-2 hover:bg-green-900/50 rounded block mb-1 text-green-300"><ZoomIn className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-green-900/50 rounded block text-green-300"><ZoomOut className="w-5 h-5" /></button>
          </div>
          <div className="bg-[#0f2318]/90 p-2 rounded-lg border border-green-900/50 backdrop-blur-md flex justify-center text-green-400">
            <Navigation className="w-5 h-5" />
          </div>
        </div>

        {/* Legend */}
        {activeLayer === 'NDVI' && (
          <div className="absolute bottom-4 right-4 bg-[#0f2318]/90 p-4 rounded-lg border border-green-900/50 backdrop-blur-md w-48">
            <h4 className="text-xs font-bold text-green-400 mb-2 uppercase tracking-wider">NDVI Legend</h4>
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-green-600 mb-2"></div>
            <div className="flex justify-between text-[10px] text-green-300">
              <span>Stressed</span>
              <span>Moderate</span>
              <span>Healthy</span>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="absolute bottom-4 left-4 bg-[#0f2318]/90 px-4 py-2 rounded-lg border border-green-900/50 backdrop-blur-md">
          <p className="text-sm font-semibold text-green-400">Last capture: Jul 15, 2026</p>
        </div>
      </div>

      {/* Field Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0f2318] border border-green-500/40 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Field A</h3>
            <span className="text-green-400 font-bold text-xl">89%</span>
          </div>
          <p className="text-green-500 text-sm mb-2">Excellent health</p>
          <div className="w-full bg-[#0a1510] rounded-full h-2 mb-4">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
          </div>
        </div>

        <div className="bg-[#0f2318] border border-amber-500/40 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Field B</h3>
            <span className="text-amber-400 font-bold text-xl">72%</span>
          </div>
          <p className="text-amber-500/80 text-sm mb-2">Needs attention</p>
          <div className="w-full bg-[#0a1510] rounded-full h-2 mb-4">
            <div className="bg-amber-400 h-2 rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        <div className="bg-[#0f2318] border border-red-500/40 rounded-xl p-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Field C</h3>
            <span className="text-red-400 font-bold text-xl">56%</span>
          </div>
          <p className="text-red-400 text-sm mb-2 font-medium">Urgent action required</p>
          <div className="w-full bg-[#0a1510] rounded-full h-2 mb-4">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: '56%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* NDVI Trend Chart */}
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6 text-green-300">NDVI Trend (12 Weeks)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ndviData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f422f" vertical={false} />
                <XAxis dataKey="week" stroke="#22c55e" tick={{fill: '#22c55e', fontSize: 12}} />
                <YAxis stroke="#22c55e" tick={{fill: '#22c55e', fontSize: 12}} domain={[0.2, 1.0]} />
                <Tooltip contentStyle={{ backgroundColor: '#0a1510', border: '1px solid #16a34a' }} />
                <Legend />
                <Line type="monotone" dataKey="fieldA" name="Field A" stroke="#22c55e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="fieldB" name="Field B" stroke="#fbbf24" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="fieldC" name="Field C" stroke="#ef4444" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-6 text-amber-400 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" /> Anomaly Detection
          </h3>
          <div className="space-y-4">
            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-red-400 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  URGENT: Water stress detected
                </h4>
                <span className="text-xs text-red-500/70">Jul 14</span>
              </div>
              <p className="text-sm mb-2 text-green-100/90">Water stress detected in north-east corner of Field B</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-red-400/80 bg-red-900/30 px-2 py-1 rounded">0.8 hectare affected</span>
                <span className="font-bold text-red-300">Action: Increase irrigation by 40%</span>
              </div>
            </div>

            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-amber-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> MODERATE: Suspected pest activity
                </h4>
                <span className="text-xs text-amber-500/70">Jul 13</span>
              </div>
              <p className="text-sm mb-2 text-green-100/90">Suspected pest activity in Field C rows 12-18</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-amber-400/80 bg-amber-900/30 px-2 py-1 rounded">0.3 hectare affected</span>
                <span className="font-bold text-amber-300">Action: Visual inspection needed</span>
              </div>
            </div>

            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-amber-400 flex items-center gap-2">
                  <Info className="w-4 h-4" /> MODERATE: Nutrient deficiency
                </h4>
                <span className="text-xs text-amber-500/70">Jul 12</span>
              </div>
              <p className="text-sm mb-2 text-green-100/90">Nutrient deficiency (likely N) in Field A southern section</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-amber-400/80 bg-amber-900/30 px-2 py-1 rounded">0.5 hectare affected</span>
                <span className="font-bold text-amber-300">Action: Apply 30kg urea/acre</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drone Upload & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-6 lg:col-span-1">
          <h3 className="text-xl font-bold mb-4 text-green-300">Analyze Drone Imagery</h3>
          <div className="border-2 border-dashed border-green-500/30 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-green-500/60 hover:bg-[#0a1510] transition-colors mb-4 group">
            <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-sm font-semibold mb-2">Drag and drop drone images</p>
            <p className="text-xs text-green-500 mb-4">Supports TIFF, JPG, PNG (Max 50MB)</p>
            <button className="px-4 py-2 bg-[#153223] rounded text-green-300 text-sm font-medium hover:bg-[#1a3f2c]">Browse Files</button>
          </div>
          <button 
            onClick={handleUpload}
            disabled={isAnalyzing}
            className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-900 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            {isAnalyzing ? (
              <><span className="animate-spin text-xl">⏳</span> Analyzing Images...</>
            ) : (
              <><Map className="w-5 h-5" /> Analyze with AI</>
            )}
          </button>
        </div>

        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-6 lg:col-span-2 overflow-x-auto">
          <h3 className="text-xl font-bold mb-4 text-green-300">Historical Comparison (NDVI Average)</h3>
          <table className="w-full text-left">
            <thead className="bg-[#0a1510] text-green-500 text-sm border-b border-green-900/50">
              <tr>
                <th className="p-3 rounded-tl-lg">Month</th>
                <th className="p-3">Field A</th>
                <th className="p-3">Field B</th>
                <th className="p-3">Field C</th>
                <th className="p-3 rounded-tr-lg">Farm Average</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-green-900/30">
                <td className="p-3 font-medium">May 2026</td>
                <td className="p-3 text-green-400">0.82</td>
                <td className="p-3 text-green-400">0.78</td>
                <td className="p-3 text-amber-400">0.68</td>
                <td className="p-3 font-bold">0.76</td>
              </tr>
              <tr className="border-b border-green-900/30">
                <td className="p-3 font-medium">June 2026</td>
                <td className="p-3 text-green-400">0.84</td>
                <td className="p-3 text-amber-400">0.71</td>
                <td className="p-3 text-red-400">0.55</td>
                <td className="p-3 font-bold">0.70</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">July 2026 (MTD)</td>
                <td className="p-3 text-green-400">0.85</td>
                <td className="p-3 text-amber-400">0.64</td>
                <td className="p-3 text-red-400">0.42</td>
                <td className="p-3 font-bold">0.64</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
