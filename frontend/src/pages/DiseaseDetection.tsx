import React, { useState } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Info, 
  MapPin, 
  X, 
  ChevronRight, 
  Droplets, 
  Flame, 
  Camera, 
  Leaf,
  Loader2,
  Thermometer,
  Wind,
  Zap
} from 'lucide-react';

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cropType, setCropType] = useState('tomato');

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      setSelectedFile(URL.createObjectURL(file));
      setShowResults(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setShowResults(false);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-4 md:p-6 lg:p-8 font-sans">
      
      {/* Page Header */}
      <div className="mb-8 border-b border-green-900/30 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-lime-300">
          🌱 Disease Detection
        </h1>
        <p className="text-green-300/70 mt-2 text-lg">Upload crop image for AI-powered disease diagnosis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Upload & Form */}
        <div className="space-y-6">
          <div className="bg-[#0f2318] rounded-2xl border border-green-900/30 p-6 shadow-xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-5 pointer-events-none">
              <Camera size={200} />
            </div>

            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className={`relative w-full h-72 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group
                ${selectedFile ? 'border-green-500/50 bg-[#0a1810]' : 'border-green-800/50 hover:border-lime-500/50 bg-[#0a1810]/50 hover:bg-[#0a1810]'}
              `}
              onClick={() => !selectedFile && document.getElementById('file-upload')?.click()}
            >
              {selectedFile ? (
                <>
                  <img src={selectedFile} alt="Crop Preview" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2318] to-transparent"></div>
                  <div className="z-10 absolute bottom-4 right-4 flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); removeFile(); }} className="p-2 bg-red-900/80 hover:bg-red-800 text-white rounded-full backdrop-blur-sm transition-colors shadow-lg">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="z-10 absolute bottom-4 left-4 bg-[#050c08]/80 px-4 py-2 rounded-lg backdrop-blur-sm border border-green-800/50 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-lime-400"/>
                    <span className="text-sm font-medium">Image ready for analysis</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 z-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-lime-900/20 transition-all duration-300">
                    <UploadCloud size={40} className="text-green-500 group-hover:text-lime-400" />
                  </div>
                  <p className="text-lg font-medium text-green-100 mb-1">Drop crop image here or click to upload</p>
                  <p className="text-sm text-green-300/60 font-medium mb-3">फसल की फोटो यहाँ डालें</p>
                  <p className="text-xs text-green-400/40">Supported formats: JPG, PNG, WEBP</p>
                </div>
              )}
              <input id="file-upload" type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handleFileSelect} />
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-300/80 mb-2">Select Crop Type</label>
                <select 
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors appearance-none"
                >
                  <option value="tomato">Tomato (टमाटर)</option>
                  <option value="wheat">Wheat (गेहूँ)</option>
                  <option value="rice">Rice (चावल)</option>
                  <option value="cotton">Cotton (कपास)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-300/80 mb-2">Optional Description / Symptoms noticed</label>
                <textarea 
                  rows={3} 
                  placeholder="E.g. leaves turning yellow since 2 days..."
                  className="w-full bg-[#0a1810] border border-green-800/50 rounded-xl px-4 py-3 text-green-50 outline-none focus:border-lime-500/50 transition-colors resize-none placeholder-green-800"
                ></textarea>
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg
                  ${!selectedFile ? 'bg-green-900/20 text-green-700 cursor-not-allowed' : 
                    isAnalyzing ? 'bg-lime-900/50 text-lime-200 cursor-wait' : 
                    'bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-500 hover:to-lime-500 text-white shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]'
                  }`}
              >
                {isAnalyzing ? (
                  <><Loader2 className="animate-spin" size={24} /> Analyzing with Gemini AI...</>
                ) : (
                  <><Search size={24} /> Analyze Crop Health</>
                )}
              </button>
              
              <div className="flex justify-center items-center gap-2 text-xs text-blue-300/60 pt-2">
                 <Zap size={14} className="text-blue-400 fill-blue-400"/> Powered by Gemini AI Vision
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results (Conditional) */}
        <div>
          {isAnalyzing ? (
             <div className="h-full flex flex-col items-center justify-center p-12 bg-[#0f2318] rounded-2xl border border-green-900/30 border-dashed animate-pulse">
                <div className="w-24 h-24 mb-8 relative">
                  <div className="absolute inset-0 border-4 border-t-lime-500 border-r-lime-500 border-b-green-800 border-l-green-800 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 bg-green-900/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Leaf size={32} className="text-lime-400 animate-bounce" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-green-300 mb-2">Processing Image Data</h3>
                <p className="text-green-500/60 text-center max-w-xs">AI is scanning for pathogens, nutrient deficiencies, and pest damage patterns...</p>
             </div>
          ) : showResults ? (
            <div className="space-y-6 animate-[fadeIn_0.6s_ease-in-out]">
              {/* Result Header Card */}
              <div className="bg-gradient-to-br from-rose-950/40 to-[#0f2318] rounded-2xl border border-rose-900/40 p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-rose-900/50 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-800/50 flex items-center gap-1">
                        <AlertTriangle size={14} /> HIGH SEVERITY
                      </span>
                      <span className="bg-green-900/30 text-green-300 text-xs font-medium px-3 py-1 rounded-full border border-green-800/30">
                        Crop: Tomato
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-rose-100 mb-1">Late Blight</h2>
                    <p className="text-rose-300/70 italic text-sm">(Phytophthora infestans)</p>
                  </div>

                  {/* Confidence Ring */}
                  <div className="flex items-center gap-4 bg-[#0a150e]/50 p-4 rounded-xl border border-green-900/30 backdrop-blur-sm">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-green-900/40" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-lime-400 transition-all duration-1000 ease-out" strokeDasharray="94.3, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <span className="absolute text-sm font-bold text-lime-100">94%</span>
                    </div>
                    <div>
                      <p className="text-xs text-green-300/60 uppercase font-semibold">AI Confidence</p>
                      <p className="text-sm text-rose-200 mt-1">Affected Area: ~35%</p>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Symptoms */}
                  <div className="bg-[#050c08]/50 p-4 rounded-xl border border-green-900/20">
                    <h3 className="font-semibold text-rose-200 mb-3 flex items-center gap-2"><Flame size={16} className="text-rose-500"/> Detected Symptoms</h3>
                    <ul className="space-y-2">
                      <li className="text-sm text-green-100/80 flex items-start gap-2"><XCircle size={14} className="text-rose-500 mt-0.5 shrink-0"/> Dark brown to black lesions on leaves</li>
                      <li className="text-sm text-green-100/80 flex items-start gap-2"><XCircle size={14} className="text-rose-500 mt-0.5 shrink-0"/> White mold on leaf undersides</li>
                      <li className="text-sm text-green-100/80 flex items-start gap-2"><XCircle size={14} className="text-rose-500 mt-0.5 shrink-0"/> Rapid defoliation</li>
                      <li className="text-sm text-green-100/80 flex items-start gap-2"><XCircle size={14} className="text-rose-500 mt-0.5 shrink-0"/> Stem rot near soil line</li>
                    </ul>
                  </div>

                  {/* Prevention */}
                  <div className="bg-[#050c08]/50 p-4 rounded-xl border border-green-900/20">
                    <h3 className="font-semibold text-lime-300 mb-3 flex items-center gap-2"><CheckCircle2 size={16} className="text-lime-500"/> Prevention Tips</h3>
                    <ul className="space-y-2">
                      <li className="text-sm text-green-100/80 flex items-start gap-2"><CheckCircle2 size={14} className="text-lime-500 mt-0.5 shrink-0"/> Improve air circulation between plants</li>
                      <li className="text-sm text-green-100/80 flex items-start gap-2"><CheckCircle2 size={14} className="text-lime-500 mt-0.5 shrink-0"/> Avoid overhead irrigation</li>
                      <li className="text-sm text-green-100/80 flex items-start gap-2"><CheckCircle2 size={14} className="text-lime-500 mt-0.5 shrink-0"/> Practice crop rotation (3-4 years)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Treatment Action Plan */}
              <div className="bg-[#0f2318] rounded-2xl border border-lime-900/30 p-6 shadow-xl relative">
                <div className="absolute -top-3 left-6 bg-lime-500 text-[#050c08] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended Action Plan
                </div>
                
                <div className="mt-4 space-y-4">
                  {[
                    { title: "Immediate Action", desc: "Apply Mancozeb 75% WP @ 2g/L water immediately to halt spread.", icon: <Droplets size={18}/> },
                    { title: "Follow-up Care", desc: "Spray Metalaxyl + Mancozeb every 7 days during conducive weather.", icon: <Thermometer size={18}/> },
                    { title: "Field Sanitation", desc: "Remove and burn infected plant parts far from the field.", icon: <Flame size={18}/> }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#0a1810] border border-green-800/40">
                      <div className="w-8 h-8 rounded-full bg-lime-900/40 border border-lime-700/50 flex items-center justify-center text-lime-400 shrink-0 font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-100 flex items-center gap-2">{step.title} {step.icon}</h4>
                        <p className="text-sm text-green-300/70 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-green-900/40 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-xs text-green-400/60 uppercase font-semibold">Estimated Treatment Cost</p>
                    <p className="text-lg font-bold text-amber-400">₹1,200 - ₹1,800 <span className="text-sm font-normal text-green-100/50">/ acre</span></p>
                  </div>
                  <button className="bg-lime-900/30 hover:bg-lime-800/40 text-lime-300 border border-lime-700/50 px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
                    <MapPin size={18} /> Find Nearby Shops
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 bg-[#0f2318] rounded-2xl border border-green-900/30 opacity-50">
               <div className="w-24 h-24 mb-6 rounded-full bg-green-900/20 flex items-center justify-center">
                 <Leaf size={40} className="text-green-800" />
               </div>
               <h3 className="text-xl font-medium text-green-600 mb-2">Awaiting Image</h3>
               <p className="text-green-800 text-center max-w-xs">Upload an image of your affected crop to receive an instant AI diagnosis and treatment plan.</p>
            </div>
          )}
        </div>
      </div>

      {/* History Table */}
      <div className="mt-12 bg-[#0f2318] rounded-2xl border border-green-900/30 p-6 shadow-xl overflow-hidden">
        <h2 className="text-xl font-semibold mb-6 text-green-200">Recent Detection History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-green-100">
            <thead className="bg-[#0a1810] text-green-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Date</th>
                <th className="px-4 py-3">Crop</th>
                <th className="px-4 py-3">Disease Detected</th>
                <th className="px-4 py-3">Confidence</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3 rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-900/20">
              {[
                { date: "19 Jul 2026", crop: "Tomato", disease: "Late Blight", conf: "94.3%", sev: "HIGH", status: "Critical", sColor: "bg-rose-900/40 text-rose-300 border-rose-700/50" },
                { date: "15 Jul 2026", crop: "Wheat", disease: "Leaf Rust", conf: "88.1%", sev: "MODERATE", status: "Treated", sColor: "bg-green-900/40 text-green-300 border-green-700/50" },
                { date: "10 Jul 2026", crop: "Cotton", disease: "Healthy", conf: "99.2%", sev: "NONE", status: "Monitoring", sColor: "bg-blue-900/40 text-blue-300 border-blue-700/50" },
                { date: "02 Jul 2026", crop: "Rice", disease: "Brown Spot", conf: "76.5%", sev: "LOW", status: "Treated", sColor: "bg-green-900/40 text-green-300 border-green-700/50" },
                { date: "28 Jun 2026", crop: "Tomato", disease: "Early Blight", conf: "91.8%", sev: "MODERATE", status: "Treated", sColor: "bg-green-900/40 text-green-300 border-green-700/50" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-green-900/10 transition-colors">
                  <td className="px-4 py-4">{row.date}</td>
                  <td className="px-4 py-4 font-medium">{row.crop}</td>
                  <td className="px-4 py-4">{row.disease}</td>
                  <td className="px-4 py-4 text-lime-400">{row.conf}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-bold ${row.sev === 'HIGH' ? 'text-rose-400' : row.sev === 'MODERATE' ? 'text-amber-400' : 'text-green-500'}`}>
                      {row.sev}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${row.sColor}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
