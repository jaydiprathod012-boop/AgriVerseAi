import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp, TrendingDown, DollarSign, Activity, Droplet, Sprout } from 'lucide-react';

const revenueData = [
  { name: 'Jan', revenue: 65000, expenses: 32000 },
  { name: 'Feb', revenue: 78000, expenses: 35000 },
  { name: 'Mar', revenue: 90000, expenses: 28000 },
  { name: 'Apr', revenue: 85000, expenses: 40000 },
  { name: 'May', revenue: 110000, expenses: 45000 },
  { name: 'Jun', revenue: 125000, expenses: 38000 },
];

const yieldHistoryData = [
  { season: 'Kharif 24', wheat: 24, rice: 12 },
  { season: 'Rabi 24', wheat: 26, rice: 13 },
  { season: 'Kharif 25', wheat: 25, rice: 13.5 },
  { season: 'Rabi 25', wheat: 27.5, rice: 14 },
  { season: 'Kharif 26', wheat: 28.5, rice: 14.7 },
];

const cropRevenueData = [
  { name: 'Wheat', value: 185000, color: '#eab308' },
  { name: 'Rice', value: 120000, color: '#3b82f6' },
  { name: 'Soybean', value: 85000, color: '#84cc16' },
  { name: 'Tomato', value: 62000, color: '#ef4444' },
];

const expenseData = [
  { name: 'Seeds', value: 22, color: '#10b981' },
  { name: 'Fertilizers', value: 35, color: '#f59e0b' },
  { name: 'Labor', value: 28, color: '#3b82f6' },
  { name: 'Equipment', value: 15, color: '#8b5cf6' },
];

export default function FarmAnalytics() {
  const [activeRange, setActiveRange] = useState('6M');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleExportPDF = () => {
    showToast('Generating PDF...');
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(5, 12, 8);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(34, 197, 94);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('AgriVerse AI - Farm Analytics Report', 15, 18);
      
      // Date
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}`, 15, 26);
      
      // Farmer Info
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Farmer: Rajesh Kumar | Pune, Maharashtra', 15, 45);
      
      // Overview Stats
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 197, 94);
      doc.text('FINANCIAL OVERVIEW', 15, 60);
      
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const stats = [
        ['Total Revenue', '₹4,52,000', '+18% vs last season'],
        ['Total Expenses', '₹1,23,000', '-5% vs last season'],
        ['Net Profit', '₹3,29,000', '+24% vs last season'],
        ['Yield Efficiency', '87%', '+3 points'],
      ];
      stats.forEach(([label, value, trend], i) => {
        doc.text(`${label}:`, 15, 72 + (i * 8));
        doc.setFont('helvetica', 'bold');
        doc.text(value, 80, 72 + (i * 8));
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(34, 197, 94);
        doc.text(trend, 130, 72 + (i * 8));
        doc.setTextColor(0, 0, 0);
      });
      
      // Crop Performance Table
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 197, 94);
      doc.text('CROP PERFORMANCE', 15, 115);
      
      // Table header
      doc.setFillColor(15, 35, 24);
      doc.rect(15, 120, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      const headers = ['Crop', 'Area(ac)', 'Yield(qtl)', 'Revenue', 'Cost', 'Profit', 'Margin'];
      const headerX = [16, 40, 60, 85, 115, 140, 165];
      headers.forEach((h, i) => doc.text(h, headerX[i], 125.5));
      
      // Table rows
      const crops = [
        ['Wheat', '5', '28.5', '₹1,85,250', '₹42,000', '₹1,43,250', '77.3%'],
        ['Rice', '3.5', '14.7', '₹1,20,540', '₹38,500', '₹82,040', '68.1%'],
        ['Soybean', '2.5', '10.2', '₹85,000', '₹25,000', '₹60,000', '70.6%'],
        ['Tomato', '1.5', '18.0', '₹62,100', '₹18,000', '₹44,100', '71.0%'],
      ];
      doc.setTextColor(0, 0, 0);
      crops.forEach((row, i) => {
        if (i % 2 === 0) { doc.setFillColor(245, 250, 247); doc.rect(15, 128 + (i * 8), 180, 8, 'F'); }
        row.forEach((cell, j) => doc.text(cell, headerX[j], 133.5 + (i * 8)));
      });
      
      // Soil Health
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 197, 94);
      doc.text('SOIL HEALTH (NPK)', 15, 175);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.text('Nitrogen (N): 68% - Moderate', 15, 185);
      doc.text('Phosphorus (P): 82% - Good', 15, 193);
      doc.text('Potassium (K): 91% - Excellent', 15, 201);
      
      // AI Summary
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 197, 94);
      doc.text('AI WEEKLY SUMMARY', 15, 215);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      const summary = doc.splitTextToSize('Your wheat field performed 12% above district average. Soybean prices are trending up - consider delaying sale by 7-10 days. Apply second dose of potassium fertilizer to tomato crop. Rainfall forecast looks positive for the next irrigation cycle.', 180);
      doc.text(summary, 15, 225);
      
      // Footer
      doc.setFillColor(5, 12, 8);
      doc.rect(0, 280, 210, 17, 'F');
      doc.setTextColor(34, 197, 94);
      doc.setFontSize(9);
      doc.text('Generated by AgriVerse AI | agriverse.ai | Empowering Indian Farmers', 15, 290);
      
      doc.save(`AgriVerse_Farm_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      showToast('✅ PDF Downloaded Successfully');
    });
  };

  const ranges = ['7D', '30D', '3M', '6M', '1Y'];

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 p-6 font-sans">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 transition-all">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span>📊</span> Farm Analytics
        </h1>
        <div className="flex bg-[#0f2318] rounded-lg p-1 border border-green-900/30">
          {ranges.map(r => (
            <button 
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${activeRange === r ? 'bg-green-600 text-white' : 'text-green-400 hover:text-white'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-green-900/40 to-[#0f2318] border border-green-500/30 rounded-xl p-5 mb-8 flex items-start gap-4">
        <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-green-300 mb-1">AI Weekly Summary</h3>
          <p className="text-green-100/90 leading-relaxed text-sm">
            📊 This Week: Your wheat field performed <strong className="text-green-400">12% above district average</strong>. Soybean prices are trending up — consider delaying sale by 7-10 days. Apply second dose of potassium fertilizer to tomato crop. Rainfall forecast looks positive for the next irrigation cycle. Expected crop health score: <strong>91%</strong> by month end.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2">
            <p className="text-green-500 text-sm">Total Revenue</p>
            <DollarSign className="w-4 h-4 text-green-400" />
          </div>
          <h3 className="text-3xl font-bold mb-2">₹4,52,000</h3>
          <p className="text-green-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +18% <span className="text-green-700">vs last season</span>
          </p>
        </div>
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2">
            <p className="text-green-500 text-sm">Total Expenses</p>
            <Activity className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-3xl font-bold mb-2">₹1,23,000</h3>
          <p className="text-green-400 text-sm flex items-center gap-1">
            <TrendingDown className="w-4 h-4" /> -5% <span className="text-green-700">vs last season</span>
          </p>
        </div>
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2">
            <p className="text-green-500 text-sm">Net Profit</p>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-3xl font-bold text-amber-400 mb-2">₹3,29,000</h3>
          <p className="text-green-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +24% <span className="text-green-700">vs last season</span>
          </p>
        </div>
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
          <div className="flex justify-between items-start mb-2">
            <p className="text-green-500 text-sm">Yield Efficiency</p>
            <Sprout className="w-4 h-4 text-green-400" />
          </div>
          <h3 className="text-3xl font-bold mb-2">87%</h3>
          <p className="text-green-400 text-sm flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +3 points
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
          <h3 className="text-lg font-bold mb-6">Revenue vs Expenses (6 Months)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f422f" vertical={false} />
                <XAxis dataKey="name" stroke="#22c55e" tick={{fill: '#22c55e'}} />
                <YAxis stroke="#22c55e" tick={{fill: '#22c55e'}} />
                <Tooltip contentStyle={{ backgroundColor: '#0a1510', border: '1px solid #16a34a', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
          <h3 className="text-lg font-bold mb-6">Crop Yield History (qtl/acre)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldHistoryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f422f" vertical={false} />
                <XAxis dataKey="season" stroke="#22c55e" tick={{fill: '#22c55e'}} />
                <YAxis stroke="#22c55e" tick={{fill: '#22c55e'}} />
                <Tooltip contentStyle={{ backgroundColor: '#0a1510', border: '1px solid #16a34a' }} />
                <Legend />
                <Area type="monotone" dataKey="wheat" stroke="#eab308" fillOpacity={1} fill="url(#colorWheat)" />
                <Area type="monotone" dataKey="rice" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
          <h3 className="text-lg font-bold mb-6">Crop-wise Revenue</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropRevenueData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f422f" horizontal={false} />
                <XAxis type="number" stroke="#22c55e" tick={{fill: '#22c55e'}} />
                <YAxis dataKey="name" type="category" stroke="#22c55e" tick={{fill: '#22c55e'}} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#0a1510', border: '1px solid #16a34a' }} cursor={{fill: '#153223'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                  {cropRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
          <h3 className="text-lg font-bold mb-6">Expense Breakdown</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`} 
                  contentStyle={{ backgroundColor: '#0a1510', border: '1px solid #16a34a' }} 
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Table */}
        <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5 lg:col-span-2 overflow-x-auto">
          <h3 className="text-lg font-bold mb-4">Crop Performance</h3>
          <table className="w-full text-left">
            <thead className="bg-[#0a1510] text-green-500 text-sm border-b border-green-900/50">
              <tr>
                <th className="p-3 rounded-tl-lg">Crop</th>
                <th className="p-3">Area (ac)</th>
                <th className="p-3">Yield (qtl)</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Cost</th>
                <th className="p-3">Profit</th>
                <th className="p-3 rounded-tr-lg">Margin</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-green-900/30">
                <td className="p-3 font-bold text-amber-400">Wheat</td>
                <td className="p-3">5</td>
                <td className="p-3">28.5</td>
                <td className="p-3 text-green-400">₹1,85,250</td>
                <td className="p-3 text-red-400">₹42,000</td>
                <td className="p-3 font-bold">₹1,43,250</td>
                <td className="p-3 text-green-400">77.3%</td>
              </tr>
              <tr className="border-b border-green-900/30">
                <td className="p-3 font-bold text-blue-400">Rice</td>
                <td className="p-3">3.5</td>
                <td className="p-3">14.7</td>
                <td className="p-3 text-green-400">₹1,20,540</td>
                <td className="p-3 text-red-400">₹38,500</td>
                <td className="p-3 font-bold">₹82,040</td>
                <td className="p-3 text-green-400">68.1%</td>
              </tr>
              <tr className="border-b border-green-900/30">
                <td className="p-3 font-bold text-lime-500">Soybean</td>
                <td className="p-3">2.5</td>
                <td className="p-3">10.2</td>
                <td className="p-3 text-green-400">₹85,000</td>
                <td className="p-3 text-red-400">₹25,000</td>
                <td className="p-3 font-bold">₹60,000</td>
                <td className="p-3 text-green-400">70.6%</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-red-500">Tomato</td>
                <td className="p-3">1.5</td>
                <td className="p-3">18.0</td>
                <td className="p-3 text-green-400">₹62,100</td>
                <td className="p-3 text-red-400">₹18,000</td>
                <td className="p-3 font-bold">₹44,100</td>
                <td className="p-3 text-green-400">71.0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-green-400" /> Soil Health
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Nitrogen (N)</span>
                  <span className="text-amber-400">68% - Moderate</span>
                </div>
                <div className="w-full bg-[#0a1510] rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Phosphorus (P)</span>
                  <span className="text-green-400">82% - Good</span>
                </div>
                <div className="w-full bg-[#0a1510] rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Potassium (K)</span>
                  <span className="text-blue-400">91% - Excellent</span>
                </div>
                <div className="w-full bg-[#0a1510] rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f2318] border border-green-900/30 rounded-xl p-5">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-400" /> Water Usage
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-[#0a1510] rounded">
                <span className="text-green-500">Monthly Irrigation</span>
                <span className="font-bold text-blue-300">18,500 L/acre</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0a1510] rounded">
                <span className="text-green-500">Water Cost</span>
                <span className="font-bold">₹2,800/month</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0a1510] rounded border border-amber-900/30">
                <span className="text-green-500">Efficiency</span>
                <span className="font-bold text-amber-400">74% (Optimal: 85%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4 justify-end">
        <button 
          onClick={handleExportPDF}
          className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FileText className="w-5 h-5" /> Export PDF
        </button>
        <button 
          onClick={() => showToast('Exporting to Excel...')}
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Download className="w-5 h-5" /> Export Excel
        </button>
      </div>
    </div>
  );
}
