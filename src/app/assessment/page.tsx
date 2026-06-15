'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Terminal, Shield, AlertTriangle, ChevronRight } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  item_type: string;
  options?: any;
}

export default function Assessment() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Array<{ item_id: string; response: string | number }>>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    const id = localStorage.getItem('student_id') || `stu-${Date.now()}`;
    setStudentId(id);
    localStorage.setItem('student_id', id);

    const fetchQuestions = async () => {
      // Simulate terminal loading
      const messages = [
        "ESTABLISHING_SECURE_CONNECTION...",
        "DECRYPTING_ORDEAL_PROTOCOLS...",
        "FETCHING_PSYCHOMETRIC_BANK...",
        "INITIALIZING_C2C_ENVIRONMENT...",
        "READY."
      ];
      
      for (let i = 0; i < messages.length; i++) {
        setTerminalLines(prev => [...prev, messages[i]]);
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      try {
        const res = await fetch('/api/assessment/generate?num_per_section=5');
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        setQuestions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, []);

  const handleResponse = async (answer: string | number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(async () => {
      const currentQ = questions[currentIndex];
      const newResponses = [...responses, { item_id: currentQ.id, response: answer }];
      
      setResponses(newResponses);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      } else {
        await submitAssessment(newResponses);
      }
    }, 400);
  };

  const submitAssessment = async (finalResponses: any) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          responses: finalResponses
        }),
      });

      if (!res.ok) throw new Error('Failed to submit assessment');
      
      router.push(`/dashboard/${studentId}`); 
    } catch (err: any) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e1416] flex items-center justify-center p-6 font-mono">
        <div className="w-full max-w-2xl bg-black/40 border border-[#2fd9f4]/20 p-8 rounded-lg shadow-[0_0_50px_rgba(47,217,244,0.05)]">
          <div className="flex items-center gap-2 mb-6 border-b border-[#2fd9f4]/10 pb-4">
            <Terminal className="w-5 h-5 text-[#2fd9f4]" />
            <span className="text-[#2fd9f4] text-sm tracking-widest font-bold uppercase">System_Initialization</span>
          </div>
          <div className="space-y-3">
            {terminalLines.map((line, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-[#2fd9f4]/40">[{i.toString().padStart(2, '0')}]</span>
                <span className={i === terminalLines.length - 1 ? "text-[#8aebff] animate-pulse" : "text-[#8aebff]/70"}>
                  {line}
                </span>
              </div>
            ))}
            <div className="flex gap-3 text-sm">
              <span className="text-[#2fd9f4]/40">[{terminalLines.length.toString().padStart(2, '0')}]</span>
              <span className="w-2 h-4 bg-[#2fd9f4] animate-bounce"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0e1416] flex items-center justify-center p-6 font-mono">
        <div className="w-full max-w-md bg-black/40 border border-red-500/20 p-8 rounded-lg text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-red-500 text-xl font-bold mb-2 tracking-widest uppercase">Corruption_Detected</h2>
          <p className="text-red-400/70 text-sm mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full py-3 bg-red-900/20 text-red-500 border border-red-500/50 rounded hover:bg-red-900/40 transition-all font-bold tracking-widest uppercase text-xs"
          >
            Reboot_System
          </button>
        </div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen bg-[#0e1416] flex items-center justify-center flex-col p-6 font-mono">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-[#2fd9f4]/10"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-[#2fd9f4] animate-spin shadow-[0_0_15px_#2fd9f4]"></div>
          <Shield className="absolute inset-0 m-auto w-10 h-10 text-[#2fd9f4] animate-pulse" />
        </div>
        <p className="text-[#2fd9f4] text-sm tracking-[0.3em] font-bold uppercase animate-pulse">Compiling_Results...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isLikert = currentQ.item_type.toLowerCase().includes('likert');
  const isSjt = currentQ.item_type.toLowerCase().includes('sjt');
  
  let parsedOptions: any = null;
  if (currentQ.options) {
      if (typeof currentQ.options === 'string') {
          try {
             parsedOptions = JSON.parse(currentQ.options);
          } catch(e) {
             parsedOptions = null;
          }
      } else {
          parsedOptions = currentQ.options;
      }
  }

  const progressPercentage = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#0e1416] text-[#dde4e5] selection:bg-[#2fd9f4]/30 selection:text-white pb-12">
      
      {/* Immersive Header */}
      <div className="w-full bg-black/40 border-b border-[#2fd9f4]/10 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-4">
          <div className="flex justify-between items-end font-mono">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-[#2fd9f4]/60 uppercase tracking-[0.2em] font-bold">Session_Identifier</span>
              <span className="text-xs text-[#2fd9f4] font-bold tracking-widest">STU-{studentId.split('-').pop()?.toUpperCase()}</span>
            </div>
            <div className="text-right flex flex-col gap-1">
              <span className="text-[10px] text-[#2fd9f4]/60 uppercase tracking-[0.2em] font-bold">Progress_Metrics</span>
              <span className="text-xs text-[#2fd9f4] font-bold tracking-widest">{currentIndex + 1} / {questions.length}</span>
            </div>
          </div>
          
          {/* Segmented Progress Bar */}
          <div className="relative h-2 w-full bg-black/40 border border-[#2fd9f4]/10 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#2fd9f4] shadow-[0_0_15px_#2fd9f4] transition-all duration-700 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
            {/* 10% Segments */}
            <div className="absolute inset-0 flex justify-between px-[1px]">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="h-full w-[1px] bg-[#0e1416]/50"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 -translate-y-4 scale-98' : 'opacity-100 translate-y-0 scale-100'}`}>
          
          <div className="flex items-center gap-3 mb-8 font-mono">
            <div className="px-3 py-1 bg-[#2fd9f4]/10 border border-[#2fd9f4]/30 rounded text-[10px] text-[#2fd9f4] font-bold uppercase tracking-widest shadow-inner">
              {currentQ.item_type}
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#2fd9f4]/30 to-transparent"></div>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-16 leading-tight font-sans">
            <span className="text-[#2fd9f4] font-mono mr-4 opacity-50 select-none">Q.</span>
            {currentQ.text}
          </h1>

          <div className="grid gap-6">
            {isLikert && (
              <div className="flex flex-col gap-8">
                <div className="flex justify-between px-2 font-mono text-[10px] text-[#2fd9f4]/50 uppercase tracking-[0.3em] font-bold">
                  <span>Strongly Disagree</span>
                  <span>Strongly Agree</span>
                </div>
                <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleResponse(score)}
                      className="flex-1 min-w-[60px] h-20 md:h-32 bg-black/20 border border-[#2fd9f4]/10 rounded-xl flex items-center justify-center text-2xl md:text-4xl font-black font-mono text-[#2fd9f4]/40 hover:text-[#2fd9f4] hover:bg-[#2fd9f4]/10 hover:border-[#2fd9f4] hover:shadow-[0_0_30px_rgba(47,217,244,0.2)] transition-all transform active:scale-95 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2fd9f4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10">{score}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(isSjt || !isLikert) && parsedOptions && Array.isArray(parsedOptions) && (
              <div className="grid gap-4">
                 {parsedOptions.map((opt: any, idx: number) => {
                    const val = opt.value || opt.id || String.fromCharCode(65 + idx);
                    const label = opt.label || opt.text || opt;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleResponse(val)}
                        className="w-full text-left p-6 md:p-8 rounded-xl border border-[#2fd9f4]/10 bg-black/20 hover:bg-[#2fd9f4]/5 hover:border-[#2fd9f4]/50 hover:shadow-[0_0_20px_rgba(47,217,244,0.1)] transition-all transform active:scale-[0.99] group flex items-start relative overflow-hidden"
                      >
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2fd9f4] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         <span className="font-mono font-black text-[#2fd9f4]/30 group-hover:text-[#2fd9f4] mr-6 text-xl md:text-2xl transition-colors">[{val}]</span> 
                         <span className="text-lg md:text-xl font-sans font-medium text-[#dde4e5] group-hover:text-white transition-colors pt-0.5">{label}</span>
                         <ChevronRight className="ml-auto w-6 h-6 text-[#2fd9f4]/20 group-hover:text-[#2fd9f4] transition-all transform group-hover:translate-x-1" />
                      </button>
                    );
                 })}
              </div>
            )}

            {!isLikert && (!parsedOptions || !Array.isArray(parsedOptions)) && (
               <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2fd9f4]/20 to-[#3626ce]/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="WAITING_FOR_INPUT_"
                    className="relative w-full p-8 bg-black/40 border border-[#2fd9f4]/20 rounded-xl text-[#2fd9f4] placeholder-[#2fd9f4]/20 focus:outline-none focus:border-[#2fd9f4] focus:ring-0 text-xl md:text-2xl transition-all font-mono tracking-wider"
                    onKeyDown={(e) => {
                       if (e.key === 'Enter' && e.currentTarget.value) {
                           handleResponse(e.currentTarget.value);
                       }
                    }}
                  />
                  <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-[#2fd9f4]/40 uppercase tracking-widest px-2">
                    <span>Press [ENTER] to confirm</span>
                    <span className="animate-pulse">_Cursor_Active</span>
                  </div>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
