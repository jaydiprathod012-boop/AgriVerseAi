import React, { useState } from 'react';
import { 
  Search, Filter, CheckCircle, ExternalLink, 
  Info, ChevronRight, BookOpen, Landmark, FileText, Settings, ShieldCheck, UserCheck, AlertCircle
} from 'lucide-react';

const schemes = [
  { id: 1, name: 'PM-KISAN', ministry: 'Ministry of Agriculture', highlight: '₹6,000/year', eligibility: 'All small & marginal farmers', active: true },
  { id: 2, name: 'PMFBY', ministry: 'MoA', highlight: '1.5% premium for kharif', eligibility: 'All farmers with crop loan', active: true },
  { id: 3, name: 'Kisan Credit Card', ministry: 'Finance Ministry', highlight: 'Credit up to ₹3L @ 7% interest', eligibility: 'All farmers', active: true },
  { id: 4, name: 'Soil Health Card', ministry: 'MoA', highlight: 'Free soil testing', eligibility: 'All farmers', active: true },
  { id: 5, name: 'PM Kisan Maandhan Yojana', ministry: 'MoA', highlight: 'Pension ₹3,000/month at 60', eligibility: 'Small farmers 18-40yr', active: true },
  { id: 6, name: 'Rashtriya Krishi Vikas Yojana', ministry: 'MoA', highlight: 'Infrastructure grant', eligibility: 'Farmers groups', active: true },
  { id: 7, name: 'National Food Security Mission', ministry: 'MoA', highlight: 'Input subsidy', eligibility: 'Wheat/Rice/Pulses farmers', active: true },
  { id: 8, name: 'Paramparagat Krishi Vikas Yojana', ministry: 'MoA', highlight: '₹50,000/ha for organic', eligibility: 'Groups of 50+ farmers', active: true },
  { id: 9, name: 'E-NAM Platform', ministry: 'MoA', highlight: 'Online mandi access', eligibility: 'All farmers', active: true },
  { id: 10, name: 'Sub-Mission on Agricultural Mechanization', ministry: 'MoA', highlight: '50% subsidy on equipment', eligibility: 'All farmers', active: true },
  { id: 11, name: 'National Horticulture Mission', ministry: 'MoA', highlight: 'Horticulture development', eligibility: 'Fruit/veg farmers', active: true },
  { id: 12, name: 'Pradhan Mantri Kisan Sampada', ministry: 'Food Processing', highlight: 'Food processing infra', eligibility: 'Farmer groups', active: true }
];

export default function SchemesFinder() {
  const [eligibilityCheck, setEligibilityCheck] = useState(false);

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 font-sans pb-20">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0f2318] to-[#0a1510] border-b border-green-900/50 p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Landmark className="w-48 h-48" />
        </div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-50 mb-3 flex items-center">
            <span className="text-amber-400 mr-3">💰</span> Government Scheme Finder
          </h1>
          <p className="text-green-400/80 text-lg max-w-2xl">
            Find and apply for agricultural schemes, subsidies, and financial aid you're eligible for in minutes.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        
        {/* Search & Filters */}
        <div className="bg-[#0f2318] border border-green-900/30 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row gap-4 items-center relative z-20 -mt-14">
          <div className="relative w-full md:w-1/3">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-green-400/50" />
            <input 
              type="text" 
              placeholder="Search schemes by name or keyword..."
              className="w-full bg-[#050c08] border border-green-900/50 rounded-xl pl-10 pr-4 py-3 text-sm text-green-50 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <select className="w-full md:w-auto bg-[#050c08] border border-green-900/50 rounded-xl px-4 py-3 text-sm text-green-50 focus:outline-none focus:border-green-500">
            <option>All States</option>
            <option>Maharashtra</option>
            <option>Madhya Pradesh</option>
            <option>Uttar Pradesh</option>
            <option>Punjab</option>
          </select>
          <select className="w-full md:w-auto bg-[#050c08] border border-green-900/50 rounded-xl px-4 py-3 text-sm text-green-50 focus:outline-none focus:border-green-500">
            <option>All Categories</option>
            <option>Financial Aid</option>
            <option>Insurance</option>
            <option>Subsidy</option>
            <option>Training</option>
            <option>Credit</option>
          </select>
          <select className="w-full md:w-auto bg-[#050c08] border border-green-900/50 rounded-xl px-4 py-3 text-sm text-green-50 focus:outline-none focus:border-green-500">
            <option>All Crops</option>
            <option>Wheat</option>
            <option>Rice</option>
            <option>Cotton</option>
          </select>
        </div>

        {/* AI Checker Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 bg-gradient-to-br from-[#0f2318] to-[#142e1f] border border-green-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-5">
              <Settings className="w-64 h-64" />
            </div>
            
            <h2 className="text-xl font-bold mb-2 text-green-300 flex items-center">
              <UserCheck className="w-6 h-6 mr-2 text-amber-400" />
              AI Eligibility Checker
            </h2>
            <p className="text-sm text-green-100/70 mb-6">Enter your details to instantly discover schemes you qualify for and calculate total benefits.</p>
            
            <form className="space-y-4 relative z-10" onSubmit={(e) => { e.preventDefault(); setEligibilityCheck(true); }}>
              <div>
                <label className="block text-xs font-medium text-green-400/80 mb-1.5">Land Area (Acres)</label>
                <input type="number" defaultValue="2.5" className="w-full bg-[#050c08] border border-green-900/50 rounded-lg p-2.5 text-sm focus:border-green-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-green-400/80 mb-1.5">Annual Income (₹)</label>
                <input type="number" defaultValue="120000" className="w-full bg-[#050c08] border border-green-900/50 rounded-lg p-2.5 text-sm focus:border-green-400 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-green-400/80 mb-1.5">State</label>
                  <select className="w-full bg-[#050c08] border border-green-900/50 rounded-lg p-2.5 text-sm focus:border-green-400 outline-none">
                    <option>Maharashtra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-green-400/80 mb-1.5">Crop Type</label>
                  <select className="w-full bg-[#050c08] border border-green-900/50 rounded-lg p-2.5 text-sm focus:border-green-400 outline-none">
                    <option>Wheat</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full mt-2 bg-amber-500 hover:bg-amber-400 text-[#050c08] font-bold py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)] flex justify-center items-center gap-2"
              >
                Check Eligibility <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            {eligibilityCheck && (
              <div className="mt-6 pt-6 border-t border-green-500/20 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#050c08] rounded-xl p-4 border border-amber-500/30">
                  <div className="text-center mb-3">
                    <div className="text-xs text-green-400/70 uppercase tracking-widest font-bold">Estimated Benefit</div>
                    <div className="text-3xl font-black text-amber-400">₹24,500<span className="text-sm font-normal text-green-100/50">/year</span></div>
                  </div>
                  <ul className="space-y-2 text-sm text-green-100">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 shrink-0"/> PM-KISAN (₹6,000)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 shrink-0"/> Subsidized Fertilizer (₹8,500)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400 shrink-0"/> PMFBY Premium Save (₹10,000)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            
            <h2 className="text-xl font-bold flex items-center">
              <StarIcon className="w-6 h-6 mr-2 text-amber-400" /> 
              Featured & High Impact Schemes
            </h2>
            
            <div className="flex flex-col gap-4">
              {/* Featured Card 1 */}
              <div className="bg-gradient-to-r from-[#142e1f] to-[#0f2318] border border-green-500/40 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-green-50">PM-KISAN Samman Nidhi</h3>
                    <span className="bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/30 font-bold uppercase tracking-wider">Top Pick</span>
                  </div>
                  <p className="text-sm text-green-300 font-medium mb-2">Direct bank transfer of ₹6,000/year in 3 equal installments</p>
                  <div className="flex items-center gap-4 text-xs text-green-100/60">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-400"/> 14 Crore+ Beneficiaries</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-blue-400"/> 100% Govt Funded</span>
                  </div>
                </div>
                <div className="shrink-0 w-full md:w-auto flex flex-col gap-2">
                  <button className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 w-full">
                    Apply Now <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Featured Card 2 */}
              <div className="bg-gradient-to-r from-[#0f2318] to-[#142e1f] border border-green-900/50 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-50 mb-1">Pradhan Mantri Fasal Bima Yojana</h3>
                  <p className="text-sm text-green-300 font-medium mb-2">Crop insurance at lowest premium (1.5-5%) with up to 100% coverage</p>
                  <div className="flex items-center gap-4 text-xs text-green-100/60">
                    <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5 text-amber-400"/> Protects against natural risks</span>
                  </div>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 w-full">
                    Calculate Premium
                  </button>
                </div>
              </div>

            </div>

            {/* Application Steps */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">How to Apply</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0f2318] border border-green-900/30 p-4 rounded-xl relative">
                  <div className="w-8 h-8 bg-green-900/50 text-green-400 rounded-full flex items-center justify-center font-bold text-sm mb-3">1</div>
                  <h4 className="font-semibold text-sm mb-1 text-green-100">Check Eligibility</h4>
                  <p className="text-xs text-green-400/60 leading-relaxed">Use our AI checker to find applicable schemes.</p>
                </div>
                <div className="bg-[#0f2318] border border-green-900/30 p-4 rounded-xl relative">
                  <div className="w-8 h-8 bg-green-900/50 text-green-400 rounded-full flex items-center justify-center font-bold text-sm mb-3">2</div>
                  <h4 className="font-semibold text-sm mb-1 text-green-100">Gather Docs</h4>
                  <p className="text-xs text-green-400/60 leading-relaxed">Keep Aadhaar, land records, and bank details ready.</p>
                </div>
                <div className="bg-[#0f2318] border border-green-900/30 p-4 rounded-xl relative">
                  <div className="w-8 h-8 bg-green-900/50 text-green-400 rounded-full flex items-center justify-center font-bold text-sm mb-3">3</div>
                  <h4 className="font-semibold text-sm mb-1 text-green-100">Submit Application</h4>
                  <p className="text-xs text-green-400/60 leading-relaxed">Apply online or visit your nearest CSC center.</p>
                </div>
                <div className="bg-[#0f2318] border border-green-900/30 p-4 rounded-xl relative">
                  <div className="w-8 h-8 bg-green-900/50 text-green-400 rounded-full flex items-center justify-center font-bold text-sm mb-3">4</div>
                  <h4 className="font-semibold text-sm mb-1 text-green-100">Track Status</h4>
                  <p className="text-xs text-green-400/60 leading-relaxed">Monitor progress through the scheme portal.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* All Schemes Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center border-b border-green-900/30 pb-4">
            <BookOpen className="w-6 h-6 mr-3 text-green-400" />
            Complete Schemes Directory
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {schemes.map((s) => (
              <div key={s.id} className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5 hover:border-green-500/50 transition-colors group flex flex-col h-full shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-green-400/70 bg-[#050c08] px-2 py-1 rounded border border-green-900/50">
                    {s.ministry}
                  </span>
                  {s.active && <span title="Active Scheme"><CheckCircle className="w-4 h-4 text-blue-400" /></span>}
                </div>
                
                <h3 className="font-bold text-green-50 text-lg mb-2 leading-tight group-hover:text-green-300 transition-colors">
                  {s.name}
                </h3>
                
                <div className="bg-green-950/30 rounded-lg p-3 mb-4 border border-green-900/20">
                  <div className="text-sm font-bold text-amber-400 mb-1">{s.highlight}</div>
                  <div className="text-xs text-green-100/70">{s.eligibility}</div>
                </div>
                
                <div className="mt-auto pt-4 flex gap-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg text-xs font-semibold transition-colors text-center">
                    Apply
                  </button>
                  <button className="flex-1 bg-[#050c08] hover:bg-green-900/40 border border-green-900/50 text-green-300 py-2 rounded-lg text-xs font-semibold transition-colors flex justify-center items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

// Icon component needed above
function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
