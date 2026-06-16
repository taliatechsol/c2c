"use client";

import { useParams } from "next/navigation";
import { 
  Trophy, 
  TrendingUp, 
  User, 
  ExternalLink, 
  AlertCircle, 
  Loader2, 
  Share2, 
  Download, 
  ChevronRight,
  Shield,
  Zap,
  Target,
  Brain,
  Layers
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import GrowthRadar from "@/components/charts/GrowthRadar";

export default function Dashboard() {
  const { id } = useParams();
  
  const [data, setData] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('intelligence');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/student/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const json = await res.json();
        setData(json);

        try {
          const alertsRes = await fetch(`/api/alerts/student/${id}`);
          if (alertsRes.ok) {
            const alertsJson = await alertsRes.json();
            setAlerts(alertsJson);
          }
        } catch (e) {
          console.error("Alerts fetch error", e);
        }
      } catch (err: any) {
        console.error(err);
        // Fallback for demo purposes
        setData({
          student: { full_name: "CYBER_NOMAD", department: "NEURAL_ENGINEERING" },
          assessments: [{
            dimension_scores: { IQ: 88, EQ: 94, SQ: 72, AQ: 91, SpQ: 76 },
            primary_profile: "THE_ARCHITECT",
            founder_fit: { Builder: 96 },
            development_report: {
              profile_summary: "EXCEPTIONAL_ADAPTIVE_CAPACITY. ANALYTICAL_RIGOR_MATCHED_BY_STRATEGIC_EMPATHY. IDEAL_FOR_HIGH_STAKES_ORCHESTRATION.",
              actionable_feedback: [
                "OPTIMIZE_NEURAL_EFFICIENCY_IN_COGNITIVE_BLINDSPOTS.",
                "LEVERAGE_HIGH_EQ_FOR_STAKEHOLDER_SYNCHRONIZATION.",
                "INTENSIFY_STRESS_TESTING_IN_NON_LINEAR_ENVIRONMENTS."
              ]
            }
          }]
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const assessment = data?.assessments?.[0] || {};
  const scores = assessment.dimension_scores || { IQ: 85, EQ: 92, SQ: 78, AQ: 88, SpQ: 70 };
  const report = assessment.development_report || {};
  const maxFitValue = assessment.founder_fit ? Math.max(...Object.values(assessment.founder_fit as Record<string, number>)) : 96;
  const founderFitType = assessment.founder_fit ? Object.keys(assessment.founder_fit)[0].toUpperCase() : "THE_BUILDER";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e1416] flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-[#2fd9f4] opacity-20" />
            <Loader2 className="absolute inset-0 h-16 w-16 animate-spin text-[#2fd9f4] [animation-delay:150ms]" />
          </div>
          <div className="text-[#2fd9f4] tracking-[0.4em] font-bold animate-pulse text-sm">SYNCHRONIZING_MATRIX...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1416] text-[#dde4e5] selection:bg-[#2fd9f4]/30 selection:text-white pb-24">
      
      {/* Top Action Bar */}
      <nav className="sticky top-0 z-[100] bg-[#0e1416]/80 backdrop-blur-xl border-b border-[#2fd9f4]/10">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#3626ce] rounded flex items-center justify-center shadow-[0_0_20px_rgba(54,38,206,0.4)]">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-mono font-black tracking-tighter text-xl">C2C<span className="text-[#2fd9f4]">.OS</span></span>
            </div>
            <div className="hidden md:flex h-8 w-[1px] bg-[#2fd9f4]/10"></div>
            <div className="hidden md:flex items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#2fd9f4]/60">
              <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> SECURE_LAYER_01</span>
              <span className="w-1 h-1 bg-[#2fd9f4]/30 rounded-full"></span>
              <span className="flex items-center gap-1.5"><Target className="w-3 h-3" /> LIVE_METRICS</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#2fd9f4]/5 hover:bg-[#2fd9f4]/10 border border-[#2fd9f4]/20 rounded font-mono text-[10px] font-bold uppercase tracking-widest text-[#2fd9f4] transition-all">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button 
              onClick={() => window.open(`/api/export/student/${id}`, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-[#3626ce]/10 hover:bg-[#3626ce]/20 border border-[#3626ce]/30 rounded font-mono text-[10px] font-bold uppercase tracking-widest text-[#c3c0ff] transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#2fd9f4] to-[#3626ce] p-[1px]">
              <div className="w-full h-full rounded bg-[#0e1416] flex items-center justify-center">
                <User className="w-4 h-4 text-[#2fd9f4]" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 pt-12">
        
        {/* Founder Fit Hero Section */}
        <section className="mb-12 relative">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#2fd9f4]/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#3626ce]/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative bg-black/40 border border-[#2fd9f4]/10 rounded-3xl p-8 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <Layers className="w-64 h-64 text-[#2fd9f4]" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2fd9f4]/10 border border-[#2fd9f4]/20 rounded font-mono text-[10px] font-bold text-[#2fd9f4] uppercase tracking-[0.3em] mb-6">
                  <Zap className="w-3 h-3" /> Cognitive_Archetype_Detected
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
                  <span className="block text-white opacity-40 text-2xl md:text-4xl font-mono mb-2 uppercase tracking-widest">THE_LEGEND:</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2fd9f4] via-[#8aebff] to-[#3626ce] drop-shadow-[0_0_30px_rgba(47,217,244,0.3)]">
                    {founderFitType}
                  </span>
                </h1>
                <p className="max-w-xl text-lg md:text-xl text-[#bbc9cd] font-medium leading-relaxed font-sans mt-8">
                  {report.profile_summary}
                </p>
              </div>

              <div className="shrink-0 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2fd9f4] to-[#3626ce] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-[#2fd9f4]/20 bg-black/40 flex items-center justify-center p-8">
                  <div className="text-center">
                    <span className="block font-mono text-[10px] text-[#2fd9f4]/60 uppercase tracking-[0.2em] mb-1 font-bold">Fit_Index</span>
                    <span className="block text-6xl md:text-8xl font-black text-white tracking-tighter">
                      {maxFitValue}<span className="text-2xl md:text-3xl text-[#2fd9f4]">%</span>
                    </span>
                  </div>
                  {/* Rotating decorative rings */}
                  <div className="absolute inset-0 border-2 border-dashed border-[#2fd9f4]/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute inset-4 border border-[#3626ce]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Intelligence Matrix - Radar Chart */}
          <div className="lg:col-span-7">
            <div className="bg-black/20 border border-[#2fd9f4]/10 rounded-3xl p-8 h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2fd9f4]/40 to-transparent"></div>
              
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-2xl font-black text-white font-mono uppercase tracking-widest flex items-center gap-3">
                    <Brain className="w-6 h-6 text-[#2fd9f4]" /> Intelligence_Matrix
                  </h2>
                  <p className="text-[10px] text-[#2fd9f4]/50 uppercase tracking-[0.3em] font-bold mt-2">Neural_Capacity_Benchmarks</p>
                </div>
                <div className="px-3 py-1 bg-black/40 border border-[#2fd9f4]/10 rounded font-mono text-[10px] text-[#2fd9f4]/40 uppercase tracking-widest">
                  Live_Data_Feed
                </div>
              </div>

              <div className="flex flex-col xl:flex-row items-center gap-12">
                <div className="w-full max-w-[400px] aspect-square relative">
                  <GrowthRadar data={scores} peerData={data?.peer_scores} />
                </div>
                
                <div className="flex-1 grid grid-cols-1 gap-4 w-full">
                  {Object.entries(scores).map(([key, value]) => (
                    <div key={key} className="bg-black/40 border border-[#2fd9f4]/5 p-5 rounded-2xl hover:border-[#2fd9f4]/30 transition-all group">
                      <div className="flex justify-between items-end mb-3">
                        <span className="font-mono text-[10px] font-bold text-[#2fd9f4]/60 uppercase tracking-[0.2em] group-hover:text-[#2fd9f4] transition-colors">{key}</span>
                        <span className="text-2xl font-black text-white">{value as number}</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden p-[1px]">
                        <div 
                          className="h-full bg-gradient-to-r from-[#2fd9f4] to-[#3626ce] rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(47,217,244,0.5)]" 
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Development Report - Targeted Directives & Match Alerts */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-black/20 border border-[#2fd9f4]/10 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2fd9f4] to-transparent"></div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-black text-white font-mono uppercase tracking-widest flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#2fd9f4]" /> Targeted_Directives
                </h2>
                <p className="text-[10px] text-[#2fd9f4]/50 uppercase tracking-[0.3em] font-bold mt-2">Optimization_Protocols_v2.0</p>
              </div>

              <div className="space-y-4">
                {report.actionable_feedback.map((directive: string, i: number) => (
                  <div key={i} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2fd9f4]/20 to-[#3626ce]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative bg-black/60 border border-[#2fd9f4]/10 p-6 rounded-2xl flex items-start gap-6 backdrop-blur-sm transition-all group-hover:bg-black/40 group-hover:translate-x-1">
                      <div className="shrink-0 w-10 h-10 rounded bg-[#2fd9f4]/5 border border-[#2fd9f4]/20 flex items-center justify-center font-mono text-[#2fd9f4] font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1">
                        <p className="text-[#dde4e5] font-sans leading-relaxed text-sm md:text-base group-hover:text-white transition-colors">
                          {directive}
                        </p>
                      </div>
                      <ChevronRight className="shrink-0 w-5 h-5 text-[#2fd9f4]/20 group-hover:text-[#2fd9f4] transition-colors self-center" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-[#3626ce]/5 border border-[#3626ce]/20 rounded-2xl text-center">
                 <h4 className="text-white font-mono font-bold uppercase tracking-widest text-xs mb-3">Professional_Legend_Protocol</h4>
                 <p className="text-[10px] text-[#c3c0ff]/60 uppercase tracking-widest mb-6 leading-relaxed">Unlock advanced career mapping via legacy interface</p>
                 <Link 
                   href="/index.html" 
                   className="inline-flex items-center gap-2 px-6 py-3 bg-[#3626ce] hover:bg-[#3626ce]/80 text-white rounded font-mono text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(54,38,206,0.3)] hover:shadow-[0_0_30px_rgba(54,38,206,0.5)]"
                 >
                   Access_Legacy_System <ExternalLink className="w-3.5 h-3.5" />
                 </Link>
              </div>
            </div>

            {/* Match Alerts */}
            {alerts && alerts.length > 0 && (
              <div className="bg-black/20 border border-[#3626ce]/10 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#3626ce] to-transparent"></div>
                
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-white font-mono uppercase tracking-widest flex items-center gap-3">
                    <Target className="w-6 h-6 text-[#3626ce]" /> Match_Alerts
                  </h2>
                  <p className="text-[10px] text-[#3626ce]/50 uppercase tracking-[0.3em] font-bold mt-2">Market_Scout_Sync</p>
                </div>

                <div className="space-y-4">
                  {alerts.slice(0, 5).map((alert: any, i: number) => (
                    <a key={i} href={alert.lead_url} target="_blank" rel="noopener noreferrer" className="block group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2fd9f4]/20 to-[#3626ce]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-black/60 border border-[#3626ce]/10 p-5 rounded-2xl flex flex-col gap-2 backdrop-blur-sm transition-all group-hover:bg-black/40 group-hover:translate-x-1">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-[#dde4e5] font-sans font-bold group-hover:text-white transition-colors line-clamp-1">
                            {alert.market_leads?.name || 'Job Opportunity'}
                          </h3>
                          <span className="shrink-0 px-2 py-0.5 bg-[#3626ce]/10 border border-[#3626ce]/20 rounded font-mono text-[10px] font-bold text-[#c3c0ff]">
                            {alert.score || alert.market_leads?.ai_score || 0}%
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono text-[#c3c0ff]/60 uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1 truncate"><Trophy className="w-3 h-3 shrink-0" /> <span className="truncate">{alert.market_leads?.company || 'Unknown'}</span></span>
                          <span className="flex items-center gap-1 text-[#2fd9f4] shrink-0 ml-auto"><ExternalLink className="w-3 h-3" /> View</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
