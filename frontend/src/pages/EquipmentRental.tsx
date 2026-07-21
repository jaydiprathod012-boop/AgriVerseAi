import React, { useState } from 'react';
import { Search, Plus, MapPin, Star, Calendar, CheckCircle, X, Clock, Truck, List, Shield, ArrowRight, Info } from 'lucide-react';

const equipmentList = [
  { id: 1, name: 'Mahindra 575 DI Tractor', category: 'Tractors', specs: '45 HP', owner: 'Akash Patil', location: 'Pune', rating: 4.8, price: 800, priceUnit: 'day', status: 'Available Now', statusColor: 'bg-green-500' },
  { id: 2, name: 'John Deere 5310 Tractor', category: 'Tractors', specs: '55 HP', owner: 'Raju Sharma', location: 'Nashik', rating: 4.6, price: 1200, priceUnit: 'day', status: 'Available', statusColor: 'bg-green-500' },
  { id: 3, name: 'Claas Crop Tiger Harvester', category: 'Harvesters', specs: '80 HP', owner: 'Vijay Kumar', location: 'Aurangabad', rating: 4.9, price: 3500, priceUnit: 'acre', status: 'Available', statusColor: 'bg-green-500' },
  { id: 4, name: 'Rotavator (3ft)', category: 'Tillers', specs: '-', owner: 'Suresh Jadhav', location: 'Solapur', rating: 4.3, price: 600, priceUnit: 'day', status: 'Booked till Jul 22', statusColor: 'bg-amber-500' },
  { id: 5, name: 'Power Sprayer (600L)', category: 'Sprayers', specs: '-', owner: 'Ganesh Bhole', location: 'Kolhapur', rating: 4.5, price: 400, priceUnit: 'day', status: 'Available', statusColor: 'bg-green-500' },
  { id: 6, name: 'Agricultural Drone', category: 'Drones', specs: 'DJI Agras T40', owner: 'Drone Seva Pvt', location: 'Pune', rating: 4.7, price: 1800, priceUnit: 'acre', status: 'Available', statusColor: 'bg-green-500' },
  { id: 7, name: 'Submersible Pump (5HP)', category: 'Water Pumps', specs: '-', owner: 'Anil Deshmukh', location: 'Sangli', rating: 4.2, price: 500, priceUnit: 'day', status: 'Available', statusColor: 'bg-green-500' },
  { id: 8, name: 'Thresher (Multi-crop)', category: 'Threshers', specs: '-', owner: 'Pramod More', location: 'Jalgaon', rating: 4.4, price: 1500, priceUnit: 'day', status: 'Available', statusColor: 'bg-green-500' },
  { id: 9, name: 'Paddy Transplanter', category: 'Tillers', specs: '8-row', owner: 'Kisan Tech', location: 'Nagpur', rating: 4.8, price: 2200, priceUnit: 'day', status: 'Booked till Jul 25', statusColor: 'bg-amber-500' },
  { id: 10, name: 'Mini Tractor (25HP)', category: 'Tractors', specs: 'Kubota B2741', owner: 'Ramesh Nikam', location: 'Ahmednagar', rating: 4.1, price: 600, priceUnit: 'day', status: 'Available', statusColor: 'bg-green-500' },
];

const categories = ['All', 'Tractors', 'Harvesters', 'Tillers', 'Sprayers', 'Drones', 'Water Pumps', 'Threshers'];

export default function EquipmentRental() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [showListForm, setShowListForm] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBookClick = (eq: any) => {
    setSelectedEquipment(eq);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    setShowBookingModal(false);
    showToast(`Successfully booked ${selectedEquipment?.name}`);
  };

  const filteredEquipment = activeCategory === 'All' 
    ? equipmentList 
    : equipmentList.filter(eq => eq.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-6 font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>🚜</span> Equipment Rental
        </h1>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-green-700/50" />
            <input 
              type="text" 
              placeholder="Search equipment..." 
              className="w-full bg-[#0f2318] border border-green-900/30 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-green-500/50 transition-colors"
            />
          </div>
          <button 
            onClick={() => setShowListForm(!showListForm)}
            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            List Your Equipment
          </button>
        </div>
      </header>

      {/* Categories */}
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

      {/* Sort & View toggles placeholder */}
      <div className="flex justify-between items-center mb-6 text-sm text-green-400">
        <span>Showing {filteredEquipment.length} results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-[#0f2318] rounded border border-green-900/30">Sort by: Relevancy</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredEquipment.map(eq => (
          <div key={eq.id} className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5 flex flex-col hover:border-green-700 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold px-2 py-1 bg-green-900/50 text-green-300 rounded uppercase tracking-wider">{eq.category}</span>
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>{eq.rating}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-1">{eq.name}</h3>
            {eq.specs !== '-' && <p className="text-green-500/80 text-sm mb-4">{eq.specs}</p>}
            {eq.specs === '-' && <div className="h-5 mb-4"></div>}

            <div className="space-y-2 mb-4 text-sm text-green-100/70 flex-1">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4" />
                <span>Owner: {eq.owner}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{eq.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${eq.statusColor}`}></div>
              <span className="text-sm font-medium">{eq.status}</span>
            </div>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-green-900/30">
              <div>
                <span className="text-lg font-bold text-green-400">₹{eq.price}</span>
                <span className="text-xs text-green-600 ml-1">/{eq.priceUnit}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-[#1a3828] rounded hover:bg-[#204230] transition-colors" title="Details">
                  <Info className="w-5 h-5 text-green-300" />
                </button>
                <button 
                  onClick={() => handleBookClick(eq)}
                  disabled={eq.status.includes('Booked')}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    eq.status.includes('Booked') 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  }`}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* My Bookings */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-green-900/30 pb-2">
        <Calendar className="w-6 h-6 text-green-500" /> My Bookings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-[#0f2318] border border-green-900/30 rounded-lg p-4 flex justify-between items-center">
          <div>
            <h4 className="font-bold">John Deere Tractor</h4>
            <p className="text-sm text-green-400">Jul 20 - Jul 22 • ₹2,400</p>
          </div>
          <span className="bg-green-900/40 text-green-400 px-3 py-1 rounded flex items-center gap-1 text-sm">
            <CheckCircle className="w-4 h-4" /> Confirmed
          </span>
        </div>
        <div className="bg-[#0f2318] border border-green-900/30 rounded-lg p-4 flex justify-between items-center">
          <div>
            <h4 className="font-bold">DJI Agras Drone</h4>
            <p className="text-sm text-amber-400">Jul 25 • ₹3,600</p>
          </div>
          <span className="bg-amber-900/40 text-amber-400 px-3 py-1 rounded flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4" /> Pending
          </span>
        </div>
      </div>

      {/* List Equipment Form */}
      {showListForm && (
        <div className="bg-[#0f2318] border border-amber-900/30 rounded-xl p-6 mb-12 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-400">List Your Equipment</h2>
            <button onClick={() => setShowListForm(false)} className="text-green-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="text" placeholder="Equipment Name" className="bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
            <select className="bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none">
              <option>Select Type</option>
              {categories.slice(1).map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="HP / Specs" className="bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
            <input type="text" placeholder="Price per day/acre (₹)" className="bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
            <input type="text" placeholder="Location" className="bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
            <input type="text" placeholder="Contact Number" className="bg-[#0a1510] border border-green-900/30 rounded p-2 focus:border-amber-500 outline-none" />
            <div className="md:col-span-2 border-2 border-dashed border-green-900/50 rounded p-8 text-center text-green-500 hover:bg-[#0a1510] transition-colors cursor-pointer">
              Upload Photos Placeholder
            </div>
          </div>
          <button className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2 rounded transition-colors">
            Submit Listing
          </button>
        </div>
      )}

      {/* How it works */}
      <h2 className="text-2xl font-bold mb-6 text-center">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center pb-12">
        <div className="bg-[#0a1510] p-6 rounded-xl border border-green-900/30">
          <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">1. Browse</h3>
          <p className="text-green-500 text-sm">Find the right equipment for your farm needs.</p>
        </div>
        <div className="bg-[#0a1510] p-6 rounded-xl border border-green-900/30">
          <div className="w-12 h-12 bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">2. Book</h3>
          <p className="text-green-500 text-sm">Select dates and confirm your booking instantly.</p>
        </div>
        <div className="bg-[#0a1510] p-6 rounded-xl border border-green-900/30">
          <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl mb-2">3. Use</h3>
          <p className="text-green-500 text-sm">Get it delivered, use it, and increase your yield.</p>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedEquipment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f2318] border border-green-500/50 rounded-xl p-6 max-w-md w-full relative">
            <button onClick={() => setShowBookingModal(false)} className="absolute top-4 right-4 text-green-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-1">{selectedEquipment.name}</h2>
            <p className="text-green-400 mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Owner: {selectedEquipment.owner}
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-green-500 mb-1">Date From</label>
                  <input type="date" className="w-full bg-[#0a1510] border border-green-900/50 rounded p-2 text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-green-500 mb-1">Date To</label>
                  <input type="date" className="w-full bg-[#0a1510] border border-green-900/50 rounded p-2 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-green-500 mb-1">Estimated {selectedEquipment.priceUnit}s</label>
                <input type="number" defaultValue={2} className="w-full bg-[#0a1510] border border-green-900/50 rounded p-2 text-white" />
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#0a1510] rounded border border-green-900/30">
                <input type="checkbox" id="delivery" className="w-4 h-4 accent-green-500" />
                <label htmlFor="delivery" className="text-sm">Delivery required (Extra charges apply)</label>
              </div>
              <div>
                <label className="block text-sm text-green-500 mb-1">Notes for owner</label>
                <textarea rows={2} className="w-full bg-[#0a1510] border border-green-900/50 rounded p-2 text-white"></textarea>
              </div>
              <div className="flex justify-between items-center py-4 border-t border-green-900/50 mt-4">
                <span className="text-lg">Total Cost:</span>
                <span className="text-2xl font-bold text-amber-400">₹{selectedEquipment.price * 2}</span>
              </div>
              <button onClick={confirmBooking} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors text-lg">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
