import React, { useState } from 'react';
import { ShoppingCart, Leaf, Clock, MapPin, MessageCircle, Info, Search, Filter, Phone, IndianRupee, Shield, CheckCircle, X } from 'lucide-react';

const products = [
  { id: 1, name: 'Premium Wheat', variety: 'Sharbati', farmer: 'Ramesh Patil', location: 'Madhya Pradesh', qty: 200, unit: 'qtl', price: 2450, isOrganic: true, posted: '2hrs ago' },
  { id: 2, name: 'Basmati Rice', variety: '1509', farmer: 'Harjit Singh', location: 'Punjab', qty: 150, unit: 'qtl', price: 4200, isOrganic: false, posted: '1 day ago' },
  { id: 3, name: 'Alphonso Mango', variety: '-', farmer: 'Suresh More', location: 'Ratnagiri', qty: 50, unit: 'boxes', price: 2800, certified: true, isOrganic: false, posted: '3hrs ago' },
  { id: 4, name: 'Red Onion', variety: '-', farmer: 'Kisan Grp', location: 'Nashik', qty: 500, unit: 'qtl', price: 1750, negotiable: true, isOrganic: false, posted: '5hrs ago' },
  { id: 5, name: 'Organic Tomatoes', variety: '-', farmer: 'Vijay Kumar', location: 'Pune', qty: 30, unit: 'qtl', price: 3200, isOrganic: true, posted: 'Today' },
  { id: 6, name: 'Soybean', variety: 'Premium', farmer: 'Anil Sharma', location: 'Indore', qty: 300, unit: 'qtl', price: 4800, isOrganic: false, posted: 'Yesterday' },
  { id: 7, name: 'Pink Lentil', variety: 'Masoor', farmer: 'Prakash More', location: 'Latur', qty: 100, unit: 'qtl', price: 5200, isOrganic: false, posted: '2 days ago' },
  { id: 8, name: 'Sugarcane', variety: '-', farmer: 'FPO', location: 'Kolhapur', qty: 1000, unit: 'tons', price: 350, isOrganic: false, posted: 'Today' },
  { id: 9, name: 'Green Chili', variety: '-', farmer: 'Ramabai Jadhav', location: 'Aurangabad', qty: 20, unit: 'qtl', price: 8500, isOrganic: false, posted: '6hrs ago' },
  { id: 10, name: 'Cotton', variety: 'Premium', farmer: 'Vijay Deshmukh', location: 'Vidarbha', qty: 100, unit: 'qtl', price: 6800, isOrganic: false, posted: '3 days ago' },
  { id: 11, name: 'Turmeric', variety: 'Erode', farmer: 'South Farmers Coop', location: 'Erode', qty: 50, unit: 'qtl', price: 12000, isOrganic: true, posted: '1 day ago' },
  { id: 12, name: 'Potato', variety: 'Chipsona', farmer: 'Santosh Singh', location: 'UP', qty: 400, unit: 'qtl', price: 1200, negotiable: true, isOrganic: false, posted: 'Today' },
];

const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Pulses', 'Spices', 'Organic'];

export default function Marketplace() {
  const [view, setView] = useState<'BUY' | 'SELL'>('BUY');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState('');

  const handleContact = (product: any) => {
    setSelectedProduct(product);
    setShowContactModal(true);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => activeCategory === 'Organic' ? p.isOrganic : true); // Simplified filter for demo

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
          <span>🛒</span> Farmer's Marketplace
        </h1>
        <div className="flex bg-[#0f2318] rounded-lg p-1 border border-green-900/30">
          <button 
            onClick={() => setView('BUY')}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${view === 'BUY' ? 'bg-green-600 text-white' : 'text-green-400 hover:text-white'}`}
          >
            Buy View
          </button>
          <button 
            onClick={() => setView('SELL')}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${view === 'SELL' ? 'bg-amber-600 text-white' : 'text-green-400 hover:text-white'}`}
          >
            Sell View
          </button>
        </div>
      </header>

      {view === 'BUY' ? (
        <>
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-colors border ${
                  activeCategory === cat 
                    ? 'bg-green-600 border-green-500 text-white' 
                    : 'bg-[#0f2318] border-green-900/30 text-green-300 hover:bg-[#153223]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search/Filter Bar */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-green-700/50" />
              <input 
                type="text" 
                placeholder="Search products, crops, varieties..." 
                className="w-full bg-[#0f2318] border border-green-900/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-green-500/50 transition-colors"
              />
            </div>
            <button className="px-4 py-2 bg-[#0f2318] border border-green-900/30 rounded-lg flex items-center gap-2 text-green-300 hover:bg-[#153223]">
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(p => (
              <div key={p.id} className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5 flex flex-col hover:border-green-500/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    {p.variety !== '-' && <span className="text-sm text-green-400">({p.variety})</span>}
                  </div>
                  {p.isOrganic && (
                    <span className="bg-green-900/40 text-green-400 text-xs px-2 py-1 rounded border border-green-700/30 flex items-center gap-1">
                      <Leaf className="w-3 h-3" /> Organic
                    </span>
                  )}
                  {p.certified && (
                    <span className="bg-blue-900/40 text-blue-400 text-xs px-2 py-1 rounded border border-blue-700/30 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Certified
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4 text-sm text-green-100/70">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4" /> <span>{p.farmer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> <span>{p.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> <span>Posted {p.posted}</span>
                  </div>
                </div>

                <div className="bg-[#0a1510] p-3 rounded-lg mb-4 flex justify-between items-center border border-green-900/20">
                  <div>
                    <p className="text-xs text-green-500 mb-1">Quantity Available</p>
                    <p className="font-bold text-lg">{p.qty} <span className="text-sm font-normal">{p.unit}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-500 mb-1">Price</p>
                    <p className="font-bold text-lg text-amber-400">₹{p.price}<span className="text-sm font-normal text-green-500">/{p.unit}</span></p>
                    {p.negotiable && <p className="text-[10px] text-amber-500/70">Negotiable</p>}
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button className="px-3 py-2 bg-[#1a3828] rounded hover:bg-[#204230] transition-colors" title="View Details">
                    <Info className="w-5 h-5 text-green-300" />
                  </button>
                  <button 
                    onClick={() => handleContact(p)}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white font-medium py-2 rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" /> Contact Farmer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* SELL VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-amber-400">Add New Listing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-green-500 mb-1">Product Name</label>
                  <input type="text" className="w-full bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-green-500 mb-1">Category</label>
                  <select className="w-full bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none">
                    <option>Select...</option>
                    {categories.slice(1).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-green-500 mb-1">Variety (Optional)</label>
                  <input type="text" className="w-full bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-green-500 mb-1">Quantity</label>
                    <input type="number" className="w-full bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm text-green-500 mb-1">Unit</label>
                    <select className="w-full bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none">
                      <option>qtl</option>
                      <option>tons</option>
                      <option>boxes</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-green-500 mb-1">Price (₹/unit)</label>
                  <input type="number" className="w-full bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 accent-green-500" />
                    <span className="text-green-300">Certified Organic</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-green-500 mb-1">Location</label>
                  <input type="text" className="w-full bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-green-500 mb-1">Description</label>
                  <textarea rows={3} className="w-full bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none"></textarea>
                </div>
                <div className="md:col-span-2 border-2 border-dashed border-green-900/50 rounded-lg p-8 text-center text-green-500 hover:bg-[#0a1510] transition-colors cursor-pointer">
                  Upload Photos Placeholder
                </div>
              </div>
              <button className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-3 rounded-lg transition-colors w-full md:w-auto">
                Submit Listing
              </button>
            </div>

            <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">My Active Listings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#0a1510] text-green-500 text-sm">
                    <tr>
                      <th className="p-3 rounded-tl-lg">Product</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Inquiries</th>
                      <th className="p-3 rounded-tr-lg">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-green-900/30">
                      <td className="p-3 font-medium">Wheat</td>
                      <td className="p-3">50 qtl</td>
                      <td className="p-3">₹2,350/qtl</td>
                      <td className="p-3 text-amber-400">12 inquiries</td>
                      <td className="p-3"><span className="bg-green-900/40 text-green-400 px-2 py-1 rounded text-xs">Active</span></td>
                    </tr>
                    <tr className="border-b border-green-900/30">
                      <td className="p-3 font-medium">Onion</td>
                      <td className="p-3">100 qtl</td>
                      <td className="p-3">₹1,800/qtl</td>
                      <td className="p-3 text-amber-400">5 inquiries</td>
                      <td className="p-3"><span className="bg-green-900/40 text-green-400 px-2 py-1 rounded text-xs">Active</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-green-500/50">Cotton</td>
                      <td className="p-3 text-green-500/50">30 qtl</td>
                      <td className="p-3 text-green-500/50">₹6,500/qtl</td>
                      <td className="p-3 text-green-500/50">3 inquiries</td>
                      <td className="p-3"><span className="bg-gray-800 text-gray-400 px-2 py-1 rounded text-xs">Expired</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" /> Top Sellers
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'Ramesh Patil', loc: 'MP', rating: 4.9, tx: 124 },
                  { name: 'Harjit Singh', loc: 'Punjab', rating: 4.8, tx: 98 },
                  { name: 'Suresh More', loc: 'Maharashtra', rating: 4.7, tx: 85 }
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-[#0a1510] rounded-lg border border-green-900/30">
                    <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center font-bold text-xl text-green-400">
                      {s.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{s.name}</h4>
                      <p className="text-xs text-green-500 mb-1">{s.loc} • {s.tx} transactions</p>
                      <div className="text-amber-400 text-xs flex items-center gap-1">
                        ★ {s.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f2318] border border-green-500/50 rounded-xl p-6 max-w-md w-full relative">
            <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 text-green-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-1">Contact Farmer</h2>
            <p className="text-green-400 mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4" /> {selectedProduct.farmer}
            </p>
            
            <div className="bg-[#0a1510] p-4 rounded-lg mb-6 border border-green-900/30">
              <h4 className="font-bold">{selectedProduct.name} {selectedProduct.variety !== '-' ? `(${selectedProduct.variety})` : ''}</h4>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-green-500">Listed Price:</span>
                <span className="font-bold text-amber-400">₹{selectedProduct.price}/{selectedProduct.unit}</span>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span className="text-green-500">Available:</span>
                <span className="font-bold">{selectedProduct.qty} {selectedProduct.unit}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-green-500 mb-1">Price Negotiation (Optional)</label>
                <input type="number" placeholder={`Offer price per ${selectedProduct.unit}`} className="w-full bg-[#0a1510] border border-green-900/50 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-green-500 mb-1">Message</label>
                <textarea rows={3} placeholder="Hi, I am interested in buying..." className="w-full bg-[#0a1510] border border-green-900/50 rounded p-2 text-white"></textarea>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-green-900/50">
                <button 
                  onClick={() => {
                    setShowContactModal(false);
                    showToast('Message sent to farmer!');
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> Send Message
                </button>
                <button className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2 rounded-lg transition-colors flex justify-center items-center gap-2">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
