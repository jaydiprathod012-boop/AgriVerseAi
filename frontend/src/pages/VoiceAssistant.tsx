import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Play, Copy, ThumbsUp, ThumbsDown, User, Bot, Languages, Settings2, ShieldCheck, Activity } from 'lucide-react';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
};

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'user',
    text: 'मेरे टमाटर के पत्तों पर काले धब्बे हो रहे हैं',
    time: '10:42 AM'
  },
  {
    id: '2',
    sender: 'ai',
    text: 'यह Late Blight (पछेता झुलसा) रोग के लक्षण हो सकते हैं। मैंकोज़ेब 75% WP @ 2 ग्राम/लीटर पानी में घोलकर 7-10 दिन के अंतराल पर छिड़काव करें। तुरंत प्रभावित पत्तियाँ हटाएं। 🌿',
    time: '10:42 AM'
  },
  {
    id: '3',
    sender: 'user',
    text: 'आज प्याज का भाव क्या है',
    time: '10:45 AM'
  },
  {
    id: '4',
    sender: 'ai',
    text: 'आज पुणे मंडी में प्याज का भाव ₹1,890/क्विंटल है, जो कल की तुलना में ₹234 अधिक है। नासिक में ₹1,756/क्विंटल चल रहा है। 📈 अगले 2-3 दिन में भाव और बढ़ने की संभावना है।',
    time: '10:45 AM'
  },
  {
    id: '5',
    sender: 'user',
    text: 'PM KISAN की अगली किस्त कब आएगी',
    time: '10:48 AM'
  },
  {
    id: '6',
    sender: 'ai',
    text: 'PM-KISAN की 19वीं किस्त अगस्त 2026 के पहले सप्ताह में आने की संभावना है। ₹2,000 सीधे आपके बैंक खाते में आएगी। स्थिति जांचने के लिए: pmkisan.gov.in पर जाएं। 💰',
    time: '10:48 AM'
  }
];

const suggestions = [
  "आज का मौसम", "फसल की बीमारी", "मंडी भाव", 
  "सरकारी योजना", "खाद की जानकारी", "बीज की सलाह"
];

type MicState = 'idle' | 'listening' | 'processing' | 'speaking';

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [micState, setMicState] = useState<MicState>('idle');
  const [activeLang, setActiveLang] = useState('Hindi');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, micState]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: 'अपना सवाल टाइप करें...',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    newMsg.text = input;
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'यह एक स्वचालित उत्तर है। AgriVerse AI आपकी सेवा में है। 🌱',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const handleMicClick = () => {
    if (micState !== 'idle') return;
    setMicState('listening');
    
    setTimeout(() => {
      setMicState('processing');
      setTimeout(() => {
        setMicState('speaking');
        // add mock message
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'user',
          text: 'वॉइस इनपुट (मॉक)',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'जी हाँ, मैं सुन रहा हूँ। मैं आपकी कैसे मदद कर सकता हूँ?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          setMicState('idle');
        }, 2000);
      }, 2000);
    }, 3000);
  };

  const getMicStyles = () => {
    switch (micState) {
      case 'listening':
        return 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] scale-110';
      case 'processing':
        return 'bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.5)] rotate-180 transition-transform duration-1000';
      case 'speaking':
        return 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)] scale-105';
      default:
        return 'bg-green-900/50 hover:bg-green-800 border border-green-500/30';
    }
  };

  const getMicStatusText = () => {
    switch (micState) {
      case 'listening': return 'सुन रहा हूँ...';
      case 'processing': return 'सोच रहा हूँ...';
      case 'speaking': return 'जवाब दे रहा हूँ...';
      default: return 'बोलें...';
    }
  };

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 flex flex-col font-sans">
      
      {/* Header */}
      <header className="bg-[#0f2318] border-b border-green-900/50 p-4 shrink-0">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
              <Bot className="w-6 h-6 text-green-400" />
            </div>
            <h1 className="text-xl font-bold">AI Kisan Assistant</h1>
          </div>
          
          <div className="flex items-center bg-[#050c08] p-1 rounded-lg border border-green-900/50">
            <Languages className="w-4 h-4 mx-2 text-green-400/50" />
            {['Hindi', 'Marathi', 'English'].map(lang => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  activeLang === lang 
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-green-400/70 hover:text-green-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* Left Column: Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0f2318] border border-green-900/30 rounded-2xl shadow-lg overflow-hidden h-[calc(100vh-140px)] lg:h-auto">
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className="shrink-0">
                    {msg.sender === 'user' ? (
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#050c08] border border-green-500/50 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-green-400" />
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`group flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-green-600 text-white rounded-tr-none' 
                          : 'bg-[#152e20] border border-green-900/50 text-green-50 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    
                    {/* Meta actions & time */}
                    <div className={`flex items-center mt-1.5 space-x-2 text-xs text-green-400/50 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <span>{msg.time}</span>
                      
                      {msg.sender === 'ai' && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5">
                          <button className="p-1 hover:bg-green-900/30 rounded"><Play className="w-3 h-3" /></button>
                          <button className="p-1 hover:bg-green-900/30 rounded"><Copy className="w-3 h-3" /></button>
                          <div className="w-px h-3 bg-green-900/50 mx-1"></div>
                          <button className="p-1 hover:text-green-300 rounded"><ThumbsUp className="w-3 h-3" /></button>
                          <button className="p-1 hover:text-red-300 rounded"><ThumbsDown className="w-3 h-3" /></button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

        </div>

        {/* Right Column: Controls */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0">
          
          {/* Mic Controller */}
          <div className="flex-1 bg-[#0f2318] border border-green-900/30 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
            
            {/* Visualizer Background */}
            {micState !== 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-48 h-48 rounded-full border border-green-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="w-64 h-64 rounded-full border border-green-500 absolute animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              </div>
            )}

            <div className="relative mb-6">
              <button 
                onClick={handleMicClick}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 relative z-10 ${getMicStyles()}`}
              >
                <Mic className={`w-10 h-10 ${micState === 'idle' ? 'text-green-400' : 'text-white'}`} />
              </button>
            </div>

            <div className="text-xl font-medium text-green-300 tracking-wide">
              {getMicStatusText()}
            </div>
            
            {/* Audio Waveform */}
            <div className="h-10 mt-6 flex items-end space-x-1">
              {[1, 2, 3, 4, 5].map((bar) => (
                <div 
                  key={bar}
                  className={`w-2 rounded-t-sm transition-all duration-150 ${micState === 'speaking' || micState === 'listening' ? 'bg-green-400' : 'bg-green-900/30'}`}
                  style={{ 
                    height: micState === 'speaking' || micState === 'listening' 
                      ? `${Math.random() * 100 + 20}%` 
                      : '4px' 
                  }}
                />
              ))}
            </div>

          </div>

          {/* Text Input & Suggestions */}
          <div className="bg-[#0f2318] border border-green-900/30 rounded-2xl p-4 shadow-lg flex flex-col gap-4">
            
            {/* Suggestions */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button 
                  key={s}
                  onClick={() => setInput(s)}
                  className="px-3 py-1.5 bg-green-900/20 hover:bg-green-900/40 border border-green-500/20 rounded-full text-xs text-green-300 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input box */}
            <div className="flex items-center gap-2 bg-[#050c08] border border-green-900/50 rounded-xl p-1.5 focus-within:border-green-500 transition-colors">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="अपना सवाल टाइप करें..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-green-50 focus:outline-none placeholder:text-green-700"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 shrink-0 bg-green-600 disabled:bg-green-900/50 hover:bg-green-500 text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Session Stats */}
      <footer className="bg-[#0a1810] border-t border-green-900/50 py-3 px-4 shrink-0">
        <div className="container mx-auto flex flex-wrap justify-center gap-6 text-xs text-green-400/70 font-medium">
          <div className="flex items-center"><Activity className="w-3.5 h-3.5 mr-1.5 text-green-500" /> Questions Asked: 12</div>
          <div className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Problems Solved: 8</div>
          <div className="flex items-center"><Languages className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Language: {activeLang}</div>
          <div className="flex items-center"><Settings2 className="w-3.5 h-3.5 mr-1.5 text-purple-500" /> Session: 24 min</div>
        </div>
      </footer>

    </div>
  );
}
