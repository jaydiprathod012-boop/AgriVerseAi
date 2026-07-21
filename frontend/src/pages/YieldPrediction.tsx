import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { 
  Calculator, 
  Sprout, 
  MapPin, 
  Calendar, 
  Droplets, 
  Wind, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Lightbulb, 
  Target,
  Loader2,
  TrendingUp,
  Award
} from 'lucide-react';

const historyData = [
  { season: 'Kharif 22', yield: 42 },
  { season: 'Rabi 22', yield: 45 },
  { season: 'Kharif 23', yield: 41 },
  { season: 'Rabi 23', yield: 48 },
  { season: 'Kharif 24', yield: 46 },
  { season: 'Rabi 24', yield: 51 },
  { season: 'Proj 25', yield: 58.4 },
];

const compareData = [
  { name: 'Your Farm', value: 58.4, fill: '#84cc16' },
  { name: 'District Avg', value: 52.0, fill: '#3b82f6' },
  { name: 'State Avg', value: 48.5, fill: '#6366f1' },
  { name: 'National Avg', value: 45.2, fill: '#8b5cf6' },
];

export default function YieldPrediction() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-4 md:p-6 lg:p-8 font-sans">
      
      {/* Page Header */}
      <div className="mb-8 border-b border-green-900/30 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-green-400">
          <Target className="text-lime-400" size={36} /> Yield Prediction
        </h1>
        <p className="text-green-300/70 mt-2 text-lg max-w-2xl">Use advanced machine learning models trained on hyper-local soil, weather, and historical data to forecast your crop yield.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left: Form */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 md:p-8 shadow-xl relative overflow-hidden">
            {/* Background design element */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <h2 className="text-xl font-bold text-green-200 mb-6 flex items-center gap-2">
              <Calculator size={20} className="text-lime-400" /> Farm Parameters
            </h2>

            <form onSubmit={handlePredict} className="space-y-5 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-green-400/80 uppercase tracking-wider mb-2">Crop Type</label>
                  <select className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors">
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Cotton</option>
                    <option>Soybean</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-green-400/80 uppercase tracking-wider mb-2">Season</label>
                  <select className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors">
                    <option>Rabi</option>
                    <option>Kharif</option>
                    <option>Zaid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-green-400/80 uppercase tracking-wider mb-2">Land Area (Acres)</label>
                  <input type="number" defaultValue={12.5} className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-green-400/80 uppercase tracking-wider mb-2">Prev Yield (Qtl)</label>
                  <input type="number" defaultValue={51} className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-green-400/80 uppercase tracking-wider mb-2">Soil Type</label>
                <select className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors">
                  <option>Black Cotton Soil</option>
                  <option>Red Loam</option>
                  <option>Alluvial</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-green-400/80 uppercase tracking-wider mb-2">Irrigation Type</label>
                  <select className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors">
                    <option>Drip Irrigation</option>
                    <option>Sprinkler</option>
                    <option>Flood</option>
                    <option>Rainfed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-green-400/80 uppercase tracking-wider mb-2">Fertilizer Used</label>
                  <select className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors">
                    <option>NPK + Urea</option>
                    <option>Organic Only</option>
                    <option>Mixed (Bio+Chem)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isPredicting}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg
                    ${isPredicting 
                      ? 'bg-lime-900/50 text-lime-200 cursor-wait' 
                      : 'bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-500 hover:to-green-500 text-[#050c08] shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]'
                    }`}
                >
                  {isPredicting ? (
                    <><Loader2 className="animate-spin" size={24} /> Processing Data Models...</>
                  ) : (
                    <><Zap size={24} className="fill-[#050c08]" /> Run Yield Prediction</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Results */}
        <div className="xl:col-span-7 space-y-6">
          {showResults ? (
            <div className="animate-[fadeIn_0.5s_ease-out] space-y-6">
              
              {/* Main Result Card */}
              <div className="bg-gradient-to-br from-[#122e1e] to-[#0a1810] rounded-3xl border border-lime-900/40 p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none">
                   <TrendingUp size={300} className="text-lime-400" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div>
                    <h3 className="text-lime-400/80 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2"><Award size={16}/> Predicted Yield (Rabi '25)</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400 drop-shadow-[0_0_15px_rgba(163,230,53,0.3)]">58.4</span>
                      <span className="text-2xl text-green-100/70 font-semibold">qtl</span>
                    </div>
                    <p className="text-green-300/60 mt-2 font-medium">Estimated Range: <span className="text-green-200">52.1 - 64.8 qtl</span></p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-[#050c08]/40 border border-green-800/40 p-4 rounded-2xl backdrop-blur-sm">
                      <p className="text-xs text-green-400/60 uppercase font-semibold mb-1">Expected Revenue</p>
                      <p className="text-2xl font-bold text-amber-400 flex items-center gap-2">
                        ₹1,24,100
                      </p>
                      <p className="text-xs text-amber-400/50 mt-1">At current mandi price (₹2,125/qtl)</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-green-900/40 relative z-10">
                  <div>
                    <p className="text-xs text-green-400/60 uppercase font-semibold">Confidence</p>
                    <p className="text-xl font-bold text-lime-400 flex items-center gap-1 mt-1"><CheckCircle2 size={16}/> 89%</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-400/60 uppercase font-semibold">Vs Last Year</p>
                    <p className="text-xl font-bold text-lime-400 flex items-center gap-1 mt-1"><ArrowUpRight size={16}/> +14.5%</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-400/60 uppercase font-semibold">Vs Dist Avg</p>
                    <p className="text-xl font-bold text-lime-400 flex items-center gap-1 mt-1"><ArrowUpRight size={16}/> +12.4%</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-400/60 uppercase font-semibold">Vs State Avg</p>
                    <p className="text-xl font-bold text-lime-400 flex items-center gap-1 mt-1"><ArrowUpRight size={16}/> +8.2%</p>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Comparison Chart */}
                <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-green-200 mb-4">Regional Comparison</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={compareData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" horizontal={true} vertical={false} />
                        <XAxis type="number" stroke="#166534" tick={{fill: '#86efac', fontSize: 10}} axisLine={false} tickLine={false} />
                        <YAxis dataKey="name" type="category" stroke="#166534" tick={{fill: '#86efac', fontSize: 11}} axisLine={false} tickLine={false} width={80} />
                        <Tooltip cursor={{fill: '#0a1810'}} contentStyle={{ backgroundColor: '#0f2318', borderColor: '#14532d', borderRadius: '8px' }} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                          {compareData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* History Trend */}
                <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-green-200 mb-4">Historical Trend</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                        <XAxis dataKey="season" stroke="#166534" tick={{fill: '#86efac', fontSize: 10}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#166534" tick={{fill: '#86efac', fontSize: 10}} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f2318', borderColor: '#14532d', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="yield" stroke="#a3e635" strokeWidth={3} dot={{r: 4, fill: '#0f2318', stroke: '#a3e635', strokeWidth: 2}} activeDot={{r: 6, fill: '#a3e635'}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Factors and Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Key Factors */}
                <div className="bg-[#0f2318] rounded-3xl border border-green-900/30 p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-green-200 mb-6">Prediction Factors</h3>
                  <div className="space-y-5">
                    {[
                      { name: 'Soil Health Suitability', val: 82, color: 'bg-emerald-500' },
                      { name: 'Irrigation Efficiency', val: 91, color: 'bg-blue-500' },
                      { name: 'Fertilizer Optimization', val: 76, color: 'bg-amber-500' },
                      { name: 'Weather Forecast Match', val: 88, color: 'bg-lime-500' }
                    ].map((factor, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-green-100">{factor.name}</span>
                          <span className="text-green-300 font-bold">{factor.val}%</span>
                        </div>
                        <div className="w-full bg-[#050c08] rounded-full h-2 border border-green-900/30">
                          <div className={`${factor.color} h-2 rounded-full`} style={{ width: `${factor.val}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="bg-gradient-to-br from-amber-950/20 to-[#0f2318] rounded-3xl border border-amber-900/30 p-6 shadow-xl">
                  <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                    <Lightbulb size={20} className="text-amber-400" /> AI Recommendations
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-amber-400 shrink-0"></div>
                      <p className="text-sm text-green-100/90">Apply additional 20kg K2O for optimal potassium levels based on your soil type.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 shrink-0"></div>
                      <p className="text-sm text-green-100/90">Consider expanding drip irrigation to improve water efficiency by 30%.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                      <p className="text-sm text-green-100/90">Implement crop rotation with legumes next season to restore nitrogen naturally.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-rose-400 shrink-0"></div>
                      <p className="text-sm text-green-100/90">Monitor closely for aphids during flowering stage; historical data shows risk.</p>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          ) : (
            <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 bg-[#0f2318] rounded-3xl border border-green-900/30 opacity-70">
               <div className="w-24 h-24 mb-6 rounded-full bg-lime-900/20 flex items-center justify-center">
                 <Calculator size={40} className="text-lime-500/50" />
               </div>
               <h3 className="text-xl font-medium text-green-500 mb-2">Awaiting Parameters</h3>
               <p className="text-green-700 text-center max-w-sm">Fill out your farm details and run the prediction to see your expected yield and personalized recommendations.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
