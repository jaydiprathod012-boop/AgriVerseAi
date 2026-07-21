import React, { useState } from 'react';
import { 
  MapPin, Search, Filter, Star, Clock, 
  Phone, Navigation2, CheckCircle, Navigation,
  X, Crosshair, Settings, Package, Info
} from 'lucide-react';

const categories = ['All', 'Fertilizer', 'Seeds', 'Pesticides', 'Equipment', 'Agri Store'];

const shops = [
  { id: 1, name: "Kisan Seva Kendra", type: "Seeds & Fertilizer", dist: "1.2 km", rating: 4.8, revs: 234, open: true, cert: true, x: 20, y: 30, color: 'bg-green-500' },
  { id: 2, name: "Sahyadri Agro Centre", type: "Pesticides & Seeds", dist: "2.3 km", rating: 4.5, revs: 156, open: true, cert: false, x: 45, y: 15, color: 'bg-blue-500' },
  { id: 3, name: "Mahadeo Farm Store", type: "Equipment & Tools", dist: "3.1 km", rating: 4.2, revs: 89, open: false, cert: false, x: 60, y: 50, color: 'bg-amber-500' },
  { id: 4, name: "Pune Krishi Kendra", type: "All Products", dist: "3.8 km", rating: 4.7, revs: 312, open: true, cert: true, x: 35, y: 70, color: 'bg-purple-500' },
  { id: 5, name: "Vitthal Agro", type: "Fertilizers", dist: "4.2 km", rating: 4.3, revs: 67, open: true, cert: false, x: 80, y: 25, color: 'bg-green-500' },
  { id: 6, name: "Bhavani Seeds", type: "Seeds only", dist: "5.1 km", rating: 4.6, revs: 128, open: true, cert: false, x: 15, y: 80, color: 'bg-green-400' },
  { id: 7, name: "Krishi Upkar Kendra", type: "All Products", dist: "6.3 km", rating: 4.1, revs: 45, open: true, cert: true, x: 70, y: 85, color: 'bg-purple-500' },
  { id: 8, name: "Modern Agri Solutions", type: "Equipment & Tech", dist: "7.8 km", rating: 4.9, revs: 89, open: true, cert: false, x: 85, y: 65, color: 'bg-amber-500' },
];

export default function NearbyShops() {
  const [activeCat, setActiveCat] = useState('All');
  const [selectedShop, setSelectedShop] = useState<typeof shops[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-[#0f2318] border-b border-green-900/50 p-4 sticky top-0 z-20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-green-400" />
            <h1 className="text-xl font-bold">Agri Shops Near You</h1>
          </div>
          <div className="flex items-center text-sm bg-green-950/40 px-4 py-2 rounded-full border border-green-900/50">
            <Navigation className="w-4 h-4 mr-2 text-amber-400" />
            <span>Location: Pune, Maharashtra</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row gap-6 relative">
        
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-[#0f2318] border border-green-900/30 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-green-400/50" />
              <input 
                type="text" 
                placeholder="Search shops, products..."
                className="w-full bg-[#050c08] border border-green-900/50 rounded-xl pl-9 pr-4 py-2 text-sm text-green-50 focus:outline-none focus:border-green-500"
              />
            </div>
            
            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    activeCat === cat
                      ? 'bg-green-600 text-white'
                      : 'bg-green-950/30 text-green-400/70 hover:bg-green-900/30 border border-green-900/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-green-400/70">
                <span>Radius:</span>
                <input type="range" className="w-24 accent-green-500" min="5" max="50" defaultValue="15" />
                <span>15km</span>
              </div>
              <button className="p-2 bg-green-950/30 border border-green-900/50 rounded-lg text-green-400 hover:bg-green-900/50">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Map Area */}
          <div className="h-64 md:h-80 bg-[#0a1510] border border-green-900/30 rounded-2xl relative overflow-hidden flex items-center justify-center">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {/* User Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white shadow-lg"></span>
              </span>
            </div>

            {/* Shop Markers */}
            {shops.map(shop => (
              <button 
                key={shop.id}
                onClick={() => setSelectedShop(shop)}
                className={`absolute w-3 h-3 rounded-full ${shop.color} shadow-[0_0_10px_currentColor] cursor-pointer hover:scale-150 transition-transform ${selectedShop?.id === shop.id ? 'ring-2 ring-white scale-150' : ''}`}
                style={{ top: `${shop.y}%`, left: `${shop.x}%` }}
                title={shop.name}
              />
            ))}

            <div className="absolute bottom-4 left-4 bg-[#0f2318]/90 backdrop-blur border border-green-900/50 p-2 rounded-lg text-xs flex gap-3 shadow-lg">
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-1.5" /> Fertilizer/Seeds</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" /> Equipment</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-purple-500 mr-1.5" /> All Products</div>
            </div>

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <span className="bg-black/60 px-4 py-2 rounded-lg text-green-400/50 text-sm font-medium border border-green-900/50 backdrop-blur-sm">
                Interactive Map Coming Soon
              </span>
            </div>
          </div>

          {/* Shop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {shops.map(shop => (
              <div 
                key={shop.id}
                onClick={() => setSelectedShop(shop)}
                className={`bg-[#0f2318] border rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-green-900/20 ${
                  selectedShop?.id === shop.id ? 'border-green-500 bg-[#143021]' : 'border-green-900/30 hover:border-green-700/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-green-50 flex items-center gap-1.5">
                    {shop.name}
                    {shop.cert && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
                  </h3>
                  <span className="text-xs bg-green-950/50 text-green-400 px-2 py-0.5 rounded border border-green-900/50">
                    {shop.dist}
                  </span>
                </div>
                
                <div className="text-sm text-green-400/70 mb-3">{shop.type}</div>
                
                <div className="flex justify-between items-center mb-4 text-xs">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    <span className="font-medium mr-1">{shop.rating}</span>
                    <span className="text-green-400/50">({shop.revs})</span>
                  </div>
                  <div className={`flex items-center ${shop.open ? 'text-green-400' : 'text-red-400'}`}>
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {shop.open ? 'Open' : 'Closed - Opens 8AM'}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 py-1.5 rounded-lg text-xs font-medium border border-green-600/30 flex items-center justify-center transition-colors">
                    <Phone className="w-3.5 h-3.5 mr-1.5" /> Call
                  </button>
                  <button className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-1.5 rounded-lg text-xs font-medium border border-blue-600/30 flex items-center justify-center transition-colors">
                    <Navigation2 className="w-3.5 h-3.5 mr-1.5" /> Directions
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Selected Shop Sidebar */}
        {selectedShop && (
          <div className="w-full lg:w-80 bg-[#0f2318] border-l border-green-900/50 shadow-2xl overflow-y-auto shrink-0 fixed lg:static inset-y-0 right-0 z-30 transform transition-transform animate-in slide-in-from-right">
            
            {/* Header */}
            <div className="p-4 border-b border-green-900/30 sticky top-0 bg-[#0f2318] z-10 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  {selectedShop.name}
                  {selectedShop.cert && <CheckCircle className="w-4 h-4 text-blue-400" />}
                </h2>
                <div className="text-sm text-green-400/70 mt-1">{selectedShop.type}</div>
              </div>
              <button 
                onClick={() => setSelectedShop(null)}
                className="p-1 text-green-400/50 hover:text-white bg-green-900/20 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              
              {/* Quick Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-xl text-sm font-semibold shadow-lg shadow-green-900/20 flex flex-col items-center justify-center gap-1 transition-colors">
                  <Phone className="w-4 h-4" /> Call Now
                </button>
                <button className="flex-1 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 border border-[#25D366]/30 py-2 rounded-xl text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </button>
              </div>

              {/* Info section */}
              <div className="bg-[#050c08] rounded-xl p-4 border border-green-900/30 space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-green-900/30">
                  <span className="text-green-400/70 flex items-center"><MapPin className="w-4 h-4 mr-2" /> Distance</span>
                  <span className="font-semibold text-green-50">{selectedShop.dist} away</span>
                </div>
                <div className="flex justify-between items-start pb-3 border-b border-green-900/30">
                  <span className="text-green-400/70 flex items-center"><Clock className="w-4 h-4 mr-2" /> Hours</span>
                  <div className="text-right">
                    <div className="text-green-400 font-medium mb-1">Open Now (closes 8PM)</div>
                    <div className="text-green-100/70 text-xs">Mon-Sat: 8AM-8PM</div>
                    <div className="text-green-100/70 text-xs">Sunday: 9AM-2PM</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-400/70 flex items-center"><Star className="w-4 h-4 mr-2" /> Rating</span>
                  <div className="flex items-center text-amber-400 font-semibold">
                    {selectedShop.rating} <span className="text-green-400/50 font-normal ml-1">({selectedShop.revs} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center text-green-300">
                  <Package className="w-4 h-4 mr-2" />
                  Top Available Products
                </h3>
                <div className="space-y-2">
                  {['Urea 46% N (50kg)', 'DAP Fertilizer (50kg)', 'Premium Wheat Seeds'].map((prod, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#050c08] p-3 rounded-lg border border-green-900/20">
                      <span className="text-sm text-green-100">{prod}</span>
                      <span className="text-sm font-bold text-green-400">₹{250 + (i*120)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Snippet */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center text-green-300">
                  <Info className="w-4 h-4 mr-2" />
                  Recent Reviews
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-950/20 p-3 rounded-lg border border-green-900/30 text-sm">
                    <div className="flex items-center mb-1">
                      <div className="flex text-amber-400"><Star className="w-3 h-3 fill-amber-400"/><Star className="w-3 h-3 fill-amber-400"/><Star className="w-3 h-3 fill-amber-400"/><Star className="w-3 h-3 fill-amber-400"/><Star className="w-3 h-3 fill-amber-400"/></div>
                      <span className="text-xs text-green-400/50 ml-2">2 days ago</span>
                    </div>
                    <p className="text-green-100/80 leading-snug">"Good quality seeds and the owner is very knowledgeable about current diseases."</p>
                  </div>
                  <div className="bg-green-950/20 p-3 rounded-lg border border-green-900/30 text-sm">
                    <div className="flex items-center mb-1">
                      <div className="flex text-amber-400"><Star className="w-3 h-3 fill-amber-400"/><Star className="w-3 h-3 fill-amber-400"/><Star className="w-3 h-3 fill-amber-400"/><Star className="w-3 h-3 fill-amber-400"/></div>
                      <span className="text-xs text-green-400/50 ml-2">1 week ago</span>
                    </div>
                    <p className="text-green-100/80 leading-snug">"Fair prices for fertilizers compared to other shops in the area."</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Style for no-scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
