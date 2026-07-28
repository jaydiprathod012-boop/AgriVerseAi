import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import {
  Mic, MicOff, Send, Copy, ThumbsUp, ThumbsDown,
  User, Bot, Languages, Settings2, ShieldCheck,
  Activity, Loader2, AlertCircle, Volume2, VolumeX
} from 'lucide-react';

type Message = { id: string; sender: 'user' | 'ai'; text: string; time: string; };
type MicState = 'idle' | 'listening' | 'processing';

const LANGUAGES = ['Hindi', 'Marathi', 'English'];

const SUGGESTIONS: Record<string, string[]> = {
  Hindi:   ['आज का मौसम', 'फसल की बीमारी', 'मंडी भाव', 'PM-KISAN योजना', 'खाद की जानकारी', 'बीज की सलाह'],
  Marathi: ['आजचे हवामान', 'पीक रोग', 'बाजारभाव', 'PM-KISAN योजना', 'खत माहिती', 'बियाणे सल्ला'],
  English: ["Today's weather", 'Crop disease help', 'Mandi prices', 'PM-KISAN scheme', 'Fertilizer advice', 'Seed guidance'],
};

const PLACEHOLDER: Record<string, string> = {
  Hindi: 'अपना सवाल टाइप करें...', Marathi: 'आपला प्रश्न टाइप करा...', English: 'Type your question...',
};

const LANG_CODE: Record<string, string> = {
  Hindi: 'hi-IN', Marathi: 'mr-IN', English: 'en-IN',
};

const WELCOME: Record<string, string> = {
  Hindi:   'नमस्ते! मैं AgriVerse AI हूँ 🌾 खेती से जुड़ा कोई भी सवाल पूछें — रोग, मौसम, मंडी भाव, सरकारी योजना। माइक बटन दबाकर बात भी कर सकते हैं!',
  Marathi: 'नमस्कार! मी AgriVerse AI आहे 🌾 शेतीशी संबंधित कोणताही प्रश्न विचारा. मायक्रोफोन बटण दाबून बोलूही शकता!',
  English: 'Hello! I am AgriVerse AI 🌾 Ask me anything about farming — diseases, weather, mandi prices, government schemes. You can also talk using the mic button!',
};

export default function VoiceAssistant() {
  const [messages, setMessages]     = useState<Message[]>([]);
  const [input, setInput]           = useState('');
  const [micState, setMicState]     = useState<MicState>('idle');
  const [activeLang, setActiveLang] = useState('Hindi');
  const [isLoading, setIsLoading]   = useState(false);
  const [error, setError]           = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak]   = useState(true);
  const [qCount, setQCount]         = useState(0);
  const [aCount, setACount]         = useState(0);

  const chatEndRef     = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef       = useRef(window.speechSynthesis);

  // Set welcome message when language changes
  useEffect(() => {
    setMessages([{
      id: '1', sender: 'ai',
      text: WELCOME[activeLang],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setError('');
    stopSpeaking();
  }, [activeLang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ── Text to Speech ──────────────────────────────────────────
  const speak = useCallback((text: string) => {
    if (!autoSpeak || !synthRef.current) return;
    stopSpeaking();

    // Remove emojis for cleaner speech
    const cleanText = text.replace(/[\u{1F300}-\u{1FFFF}]/gu, '').replace(/[🌾🌱🌿💰📈]/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = LANG_CODE[activeLang];
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Pick a good voice
    const voices = synthRef.current.getVoices();
    const preferred = voices.find(v => v.lang === LANG_CODE[activeLang]);
    if (preferred) utterance.voice = preferred;

    utterance.onstart  = () => setIsSpeaking(true);
    utterance.onend    = () => setIsSpeaking(false);
    utterance.onerror  = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, [activeLang, autoSpeak]);

  const stopSpeaking = () => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  };

  // ── Send message ─────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    stopSpeaking();

    const userMsg: Message = {
      id: Date.now().toString(), sender: 'user', text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError('');
    setQCount(p => p + 1);

    try {
      const history = messages.slice(-6);
      const res = await axios.post('/api/assistant/chat', {
        message: text.trim(), language: activeLang, history
      }, { timeout: 20000 });

      const aiText = res.data.response;
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(), sender: 'ai', text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setACount(p => p + 1);
      speak(aiText);

    } catch (err: any) {
      const isNet = !err.response;
      const errMsg = isNet
        ? '❌ Backend connect नहीं हो रहा। Render service check करें।'
        : (err?.response?.data?.response || 'कोई error आई। दोबारा try करें।');
      setError(errMsg);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), sender: 'ai', text: errMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Voice Input ───────────────────────────────────────────────
  const handleMicClick = () => {
    if (micState === 'listening') {
      recognitionRef.current?.stop();
      setMicState('idle');
      return;
    }

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError('Voice input ke liye Chrome browser use karo।');
      return;
    }

    stopSpeaking();
    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = LANG_CODE[activeLang];
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart  = () => { setMicState('listening'); setError(''); };
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setMicState('processing');
      setTimeout(() => { setMicState('idle'); sendMessage(transcript); }, 300);
    };
    rec.onerror  = (e: any) => {
      setMicState('idle');
      if (e.error === 'not-allowed') setError('Microphone permission denied। Browser settings check karo।');
      else if (e.error === 'no-speech') setError('Koi awaaz nahi aai। Dobara try karo।');
      else setError('Voice error: ' + e.error);
    };
    rec.onend = () => { if (micState === 'listening') setMicState('idle'); };
    rec.start();
  };

  const getMicStyle = () => ({
    idle:       'bg-gradient-to-br from-green-900/60 to-green-800/40 hover:from-green-700/60 hover:to-green-600/40 border-2 border-green-500/30 hover:border-green-400/50',
    listening:  'bg-gradient-to-br from-red-500 to-red-600 border-2 border-red-300 shadow-[0_0_40px_rgba(239,68,68,0.7)] scale-110 animate-pulse',
    processing: 'bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.6)]',
  }[micState]);

  const getMicLabel = () => {
    if (micState === 'listening')  return activeLang === 'Hindi' ? '🔴 सुन रहा हूँ... (रोकने के लिए click करें)' : activeLang === 'Marathi' ? '🔴 ऐकतोय... (थांबवण्यासाठी click करा)' : '🔴 Listening... (click to stop)';
    if (micState === 'processing') return activeLang === 'Hindi' ? '⏳ समझ रहा हूँ...' : '⏳ Processing...';
    return activeLang === 'Hindi' ? '🎤 बोलने के लिए click करें' : activeLang === 'Marathi' ? '🎤 बोलण्यासाठी click करा' : '🎤 Click to speak';
  };

  return (
    <div className="min-h-screen bg-[#050c08] text-green-50 flex flex-col font-sans">

      {/* Header */}
      <header className="bg-[#0f2318] border-b border-green-900/50 p-4 shrink-0">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30 relative">
              <Bot className="w-6 h-6 text-green-400" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f2318] animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Kisan Assistant</h1>
              <p className="text-xs text-green-400/60">Powered by Google Gemini ✨</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto Speak Toggle */}
            <button
              onClick={() => { setAutoSpeak(p => !p); stopSpeaking(); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all ${
                autoSpeak
                  ? 'bg-green-500/20 border-green-500/40 text-green-300'
                  : 'bg-gray-900/40 border-gray-700/40 text-gray-400'
              }`}
              title={autoSpeak ? 'Auto-speak ON' : 'Auto-speak OFF'}
            >
              {autoSpeak ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{autoSpeak ? 'Voice ON' : 'Voice OFF'}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#050c08] p-1 rounded-lg border border-green-900/50">
              <Languages className="w-4 h-4 mx-2 text-green-400/50" />
              {LANGUAGES.map(lang => (
                <button key={lang} onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    activeLang === lang ? 'bg-green-600 text-white shadow-sm' : 'text-green-400/70 hover:text-green-200'
                  }`}>
                  {lang === 'Hindi' ? 'हिंदी' : lang === 'Marathi' ? 'मराठी' : 'English'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row gap-6 overflow-hidden">

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0f2318] border border-green-900/30 rounded-2xl shadow-lg overflow-hidden h-[calc(100vh-200px)] lg:h-auto">
          <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent">

            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="shrink-0">
                    {msg.sender === 'user'
                      ? <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center"><User className="w-4 h-4 text-white" /></div>
                      : <div className="w-8 h-8 rounded-full bg-[#050c08] border border-green-500/50 flex items-center justify-center"><Bot className="w-4 h-4 text-green-400" /></div>
                    }
                  </div>
                  <div className={`group flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-green-600 text-white rounded-tr-none'
                        : 'bg-[#152e20] border border-green-900/50 text-green-50 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center mt-1 gap-2 text-xs text-green-400/40 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <span>{msg.time}</span>
                      {msg.sender === 'ai' && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button onClick={() => speak(msg.text)} className="p-1 hover:bg-green-900/30 rounded" title="Speak">
                            <Volume2 className="w-3 h-3" />
                          </button>
                          <button onClick={() => navigator.clipboard.writeText(msg.text)} className="p-1 hover:bg-green-900/30 rounded" title="Copy">
                            <Copy className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:text-green-300 rounded"><ThumbsUp className="w-3 h-3" /></button>
                          <button className="p-1 hover:text-red-300 rounded"><ThumbsDown className="w-3 h-3" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#050c08] border border-green-500/50 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="bg-[#152e20] border border-green-900/50 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-green-400 animate-spin" />
                    <span className="text-sm text-green-300/70">
                      {activeLang === 'Hindi' ? 'सोच रहा हूँ...' : activeLang === 'Marathi' ? 'विचार करतोय...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {isSpeaking && (
              <div className="flex justify-center">
                <button onClick={stopSpeaking}
                  className="flex items-center gap-2 px-4 py-1.5 bg-green-900/30 border border-green-500/30 rounded-full text-xs text-green-300 hover:bg-red-900/20 hover:border-red-500/30 hover:text-red-300 transition-all">
                  <Volume2 className="w-3 h-3 animate-pulse" />
                  {activeLang === 'Hindi' ? 'बोल रहा है... (रोकें)' : activeLang === 'Marathi' ? 'बोलतोय... (थांबवा)' : 'Speaking... (stop)'}
                </button>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-green-900/30 bg-[#0a1810]">
            {error && (
              <div className="flex items-start gap-2 text-xs text-red-400 mb-2 bg-red-900/10 rounded-lg p-2">
                <AlertCircle size={12} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-[#050c08] border border-green-900/50 rounded-xl p-1.5 focus-within:border-green-500 transition-colors">
              <input type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                placeholder={PLACEHOLDER[activeLang]}
                className="flex-1 bg-transparent px-3 py-2 text-sm text-green-50 focus:outline-none placeholder:text-green-700"
              />
              <button onClick={() => sendMessage(input)} disabled={!input.trim() || isLoading}
                className="w-10 h-10 shrink-0 bg-green-600 disabled:bg-green-900/50 hover:bg-green-500 text-white rounded-lg flex items-center justify-center transition-colors">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[360px] flex flex-col gap-5 shrink-0">

          {/* Mic Controller */}
          <div className="bg-[#0f2318] border border-green-900/30 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[280px]">

            {/* Ripple animation when listening */}
            {micState === 'listening' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 rounded-full border-2 border-red-500/40 animate-[ping_1s_ease-in-out_infinite]" />
                <div className="w-48 h-48 rounded-full border border-red-500/20 absolute animate-[ping_1.5s_ease-in-out_infinite]" />
                <div className="w-64 h-64 rounded-full border border-red-500/10 absolute animate-[ping_2s_ease-in-out_infinite]" />
              </div>
            )}

            <button onClick={handleMicClick}
              className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 z-10 mb-5 ${getMicStyle()}`}>
              {micState === 'listening'
                ? <MicOff className="w-12 h-12 text-white" />
                : <Mic className={`w-12 h-12 ${micState === 'idle' ? 'text-green-400' : 'text-white'}`} />
              }
            </button>

            <p className="text-sm font-medium text-green-300 text-center leading-snug">{getMicLabel()}</p>
            <p className="text-xs text-green-900/60 mt-2 text-center">Chrome mein best kaam karta hai</p>

            {/* Waveform */}
            <div className="h-10 mt-5 flex items-end gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i}
                  className={`w-2 rounded-t transition-all duration-100 ${
                    micState === 'listening'  ? 'bg-red-400' :
                    micState === 'processing' ? 'bg-amber-400' :
                    isSpeaking               ? 'bg-green-400' : 'bg-green-900/30'
                  }`}
                  style={{
                    height: (micState === 'listening' || isSpeaking)
                      ? `${15 + Math.random() * 85}%` : '4px'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="bg-[#0f2318] border border-green-900/30 rounded-2xl p-4">
            <h3 className="text-xs font-semibold text-green-400/70 uppercase tracking-wider mb-3">
              {activeLang === 'Hindi' ? '⚡ जल्दी पूछें' : activeLang === 'Marathi' ? '⚡ झटपट विचारा' : '⚡ Quick Questions'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS[activeLang].map(s => (
                <button key={s} onClick={() => sendMessage(s)} disabled={isLoading}
                  className="px-3 py-1.5 bg-green-900/20 hover:bg-green-800/40 border border-green-500/20 hover:border-green-500/50 rounded-full text-xs text-green-300 transition-all duration-200 disabled:opacity-40 hover:scale-105">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#0a1810] border border-green-900/20 rounded-2xl p-4">
            <h3 className="text-xs font-semibold text-green-400/50 uppercase tracking-wider mb-2">
              {activeLang === 'Hindi' ? '💡 कैसे use करें' : activeLang === 'Marathi' ? '💡 कसे वापरावे' : '💡 How to use'}
            </h3>
            <ul className="text-xs text-green-900/70 space-y-1.5">
              <li>🎤 {activeLang === 'Hindi' ? 'माइक दबाएं और बोलें' : activeLang === 'Marathi' ? 'माईक दाबा आणि बोला' : 'Press mic and speak'}</li>
              <li>⌨️ {activeLang === 'Hindi' ? 'या टाइप करके Enter दबाएं' : activeLang === 'Marathi' ? 'किंवा टाइप करून Enter दाबा' : 'Or type and press Enter'}</li>
              <li>🔊 {activeLang === 'Hindi' ? 'AI का जवाब सुनाई देगा' : activeLang === 'Marathi' ? 'AI चे उत्तर ऐकू येईल' : 'AI will speak the answer'}</li>
              <li>🌐 {activeLang === 'Hindi' ? 'भाषा बदलने के लिए ऊपर click करें' : activeLang === 'Marathi' ? 'भाषा बदलण्यासाठी वर click करा' : 'Click above to change language'}</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Stats Footer */}
      <footer className="bg-[#0a1810] border-t border-green-900/50 py-3 px-4 shrink-0">
        <div className="container mx-auto flex flex-wrap justify-center gap-6 text-xs text-green-400/60">
          <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-green-500" /> {activeLang === 'Hindi' ? 'पूछे गए' : 'Asked'}: {qCount}</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-amber-500" /> {activeLang === 'Hindi' ? 'जवाब' : 'Answered'}: {aCount}</span>
          <span className="flex items-center gap-1"><Languages className="w-3 h-3 text-blue-500" /> {activeLang}</span>
          <span className="flex items-center gap-1"><Settings2 className="w-3 h-3 text-purple-500" /> Gemini Flash</span>
        </div>
      </footer>
    </div>
  );
}
