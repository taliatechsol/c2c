"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Users, 
  Download, 
  Activity, 
  PieChart, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingDown, 
  PersonStanding, 
  History, 
  Calendar,
  ChevronDown,
  ChevronRight,
  Plus,
  HelpCircle,
  LogOut,
  Home,
  LayoutDashboard,
  Zap,
  Brain,
  Rocket
} from "lucide-react";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });
const mono = JetBrains_Mono({ subsets: ["latin"] });

export default function TPODashboard() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [interventionCollapsed, setInterventionCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/cohort/${id}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        // Mock data fallback matching the UI export
        setData({
          averages: { IQ: 78.5, EQ: 84.2, SQ: 62.1, AQ: 42.0, SpQ: 75.3 },
          founder_distribution: { Builder: 33, Leader: 26, Rainmaker: 15, Anchor: 26 },
          support_needs: [
            "Tier-3 Batch: Computer Science (Section D) - Low AQ Score detected across 42 students.",
            "High-Risk Individual: Vikram S. (ID: 9822) - Matching 94% with dropout behavioral patterns.",
            "Placement Mismatch: Fintech Stream - Employer requirements for 'Leader' profiles exceeding cohort supply by 12%."
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0e1416]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8aebff]/20 border-t-[#8aebff] rounded-full animate-spin"></div>
          <span className={`text-[#8aebff] text-sm tracking-[0.2em] font-medium animate-pulse ${mono.className}`}>SYNCING COHORT TELEMETRY...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#0e1416] text-[#dde4e5] ${hanken.className}`}>
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0e1416]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(47,217,244,0.15)]">
        <div className="flex items-center gap-12">
          <span className={`text-3xl font-extrabold tracking-tighter text-[#8aebff] ${hanken.className}`}>c2c</span>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm text-[#bbc9cd] hover:text-[#8aebff] transition-colors" href="#">Assessment</a>
            <a className="text-sm text-[#bbc9cd] hover:text-[#8aebff] transition-colors" href="#">Dashboard</a>
            <a className="text-sm text-[#8aebff] border-b-2 border-[#8aebff] pb-1" href="#">Analytics</a>
            <a className="text-sm text-[#bbc9cd] hover:text-[#8aebff] transition-colors" href="#">Employer View</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-[#8aebff] border border-[#8aebff]/30 px-4 py-2 hover:bg-white/5 transition-all duration-300">Switch Profile</button>
          <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden">
            <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBylOle7xn7AmoLw4xAQ7_S-A5hJ-GQRCLX5UKbEcoYbcQmOczD75OG2C-HQptHcWjbcqzh_koixYgXxa0b3qEN75WI9CtBKhIUqT6_eD0Sm3sR1Z5CGThjquK4uoDa7gFlDDqD55HQcKbpDOqmxXTawPCxVgLdvCZuI_bPJH4FtXl_-WqFgZ37K1mxop14ND6rXvHOAu1iSOGQxhruVGig58HoYlbYqsdjceKei10jY_JCcqN-vgsAEevROE0RDF5tUedqJl9BhMAn"/>
          </div>
        </div>
      </header>

      <div className="flex pt-[72px]">
        {/* SideNavBar */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#1a2122]/90 backdrop-blur-2xl border-r border-white/5 h-[calc(100vh-72px)] sticky top-[72px]">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#22d3ee]/20 flex items-center justify-center rounded">
                <LayoutDashboard className="text-[#8aebff] w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#8aebff]">TPO Command</h2>
                <p className={`text-[10px] text-[#bbc9cd] opacity-70 font-bold tracking-[0.1em] ${mono.className}`}>ENTERPRISE TIER</p>
              </div>
            </div>

            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 text-[#bbc9cd] hover:text-white px-3 py-2 rounded-md group">
                <Home className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Home</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-[#bbc9cd] hover:text-white px-3 py-2 rounded-md group">
                <Users className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Talent Pool</span>
              </a>
              <a href="#" className="flex items-center gap-3 bg-[#22d3ee]/20 text-[#8aebff] border-l-4 border-[#8aebff] px-3 py-2 rounded-md">
                <Calendar className="w-4 h-4" />
                <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Interviews</span>
              </a>
            </nav>
          </div>

          <div className="mt-auto p-6 space-y-4">
            <button className="w-full bg-[#8aebff] text-[#00363e] py-3 text-[12px] font-bold tracking-[0.1em] rounded flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg">
              <Plus className="w-4 h-4" /> Post New Job
            </button>
            <div className="space-y-1">
              <a href="#" className="flex items-center gap-3 text-[#bbc9cd] hover:text-white px-3 py-2 transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Support</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-[#bbc9cd] hover:text-white px-3 py-2 transition-colors">
                <LogOut className="w-4 h-4" />
                <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Logout</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-7xl mx-auto overflow-y-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className={`text-[#8aebff] text-[12px] font-bold tracking-[0.1em] mb-2 ${mono.className}`}>ADMINISTRATION COMMAND CENTER // COHORT 2024.B</p>
              <h1 className="text-5xl font-extrabold text-white tracking-tight">Institutional Analytics</h1>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center bg-[#2f3638] px-4 py-2 border border-white/10">
                <Calendar className="text-[#8aebff] w-4 h-4 mr-2" />
                <span className={`text-[#dde4e5] text-xs font-medium tracking-[0.05em] ${mono.className}`}>MAY 2024 - JUNE 2024</span>
              </div>
              <button className="bg-[#8aebff]/10 border border-[#8aebff]/40 text-[#8aebff] px-4 py-2 flex items-center gap-2 hover:bg-[#8aebff]/20 transition-all text-[12px] font-bold tracking-[0.1em] rounded">
                <Download className="w-4 h-4" /> EXPORT REPORT
              </button>
            </div>
          </div>

          {/* Top: KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#0f172a]/40 backdrop-blur-md p-6 border border-white/10 rounded-xl relative overflow-hidden group hover:border-[#8aebff]/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#8aebff]/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[#bbc9cd] text-[10px] font-bold tracking-[0.1em] uppercase ${mono.className}`}>Total Enrolled Students</span>
                <Users className="text-[#8aebff] w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className={`text-4xl font-bold text-white ${mono.className}`}>4,282</h3>
                <span className={`text-[#10b981] text-[10px] font-bold ${mono.className}`}>+12.4%</span>
              </div>
              <div className="mt-4 w-full bg-[#1a2122] h-1 rounded-full overflow-hidden">
                <div className="h-full bg-[#8aebff]" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div className="bg-[#0f172a]/40 backdrop-blur-md p-6 border border-white/10 rounded-xl relative overflow-hidden group hover:border-[#c3c0ff]/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#c3c0ff]/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[#bbc9cd] text-[10px] font-bold tracking-[0.1em] uppercase ${mono.className}`}>Average Cohort EQ</span>
                <Activity className="text-[#c3c0ff] w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className={`text-4xl font-bold text-white ${mono.className}`}>{data.averages.EQ.toFixed(1)}<span className="text-xl">/100</span></h3>
                <span className={`text-[#10b981] text-[10px] font-bold ${mono.className}`}>▲ High</span>
              </div>
              <div className="mt-4 w-full bg-[#1a2122] h-1 rounded-full overflow-hidden">
                <div className="h-full bg-[#c3c0ff]" style={{ width: `${data.averages.EQ}%` }}></div>
              </div>
            </div>

            <div className="bg-[#0f172a]/40 backdrop-blur-md p-6 border border-white/10 rounded-xl relative overflow-hidden group hover:border-[#ffd6a3]/40 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffd6a3]/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[#bbc9cd] text-[10px] font-bold tracking-[0.1em] uppercase ${mono.className}`}>Placement Readiness %</span>
                <Zap className="text-[#ffd6a3] w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className={`text-4xl font-bold text-white ${mono.className}`}>67.8<span className="text-xl">%</span></h3>
                <span className={`text-[#bbc9cd] text-[10px] font-bold ${mono.className}`}>Target: 75%</span>
              </div>
              <div className="mt-4 w-full bg-[#1a2122] h-1 rounded-full overflow-hidden">
                <div className="h-full bg-[#ffd6a3]" style={{ width: '67.8%' }}></div>
              </div>
            </div>
          </section>

          {/* Middle: Horizontal Bar Chart Heatmap (Founder Profiles) */}
          <section className="mb-12">
            <div className="bg-[#0f172a]/40 backdrop-blur-md p-8 border border-white/10 rounded-xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Founder Profile Distribution</h3>
                  <p className="text-[#bbc9cd] text-sm mt-1">Student behavioral archetypes calculated via AI Match Score</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#8aebff] rounded-sm"></div>
                    <span className={`text-[10px] text-[#bbc9cd] uppercase tracking-wider font-bold ${mono.className}`}>Builder</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#c3c0ff] rounded-sm"></div>
                    <span className={`text-[10px] text-[#bbc9cd] uppercase tracking-wider font-bold ${mono.className}`}>Leader</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#ffd6a3] rounded-sm"></div>
                    <span className={`text-[10px] text-[#bbc9cd] uppercase tracking-wider font-bold ${mono.className}`}>Anchor</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Builder Profile */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className={`text-lg font-bold text-white ${mono.className}`}>BUILDER <span className="text-xs text-[#bbc9cd] opacity-60 font-normal">(Technical & Iterative)</span></span>
                    <span className={`text-[#8aebff] font-bold ${mono.className}`}>{data.founder_distribution.Builder}% Density</span>
                  </div>
                  <div className="h-10 w-full flex bg-[#1a2122] rounded overflow-hidden border border-white/5">
                    <div className="h-full bg-[#8aebff] relative group" style={{ width: `${data.founder_distribution.Builder}%` }}>
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_50%,#fff_50%,#fff_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
                    </div>
                    <div className="h-full bg-[#c3c0ff]" style={{ width: '30%' }}></div>
                    <div className="h-full bg-[#ffd6a3]" style={{ width: '37%' }}></div>
                  </div>
                </div>

                {/* Leader Profile */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className={`text-lg font-bold text-white ${mono.className}`}>LEADER <span className="text-xs text-[#bbc9cd] opacity-60 font-normal">(Visionary & Strategic)</span></span>
                    <span className={`text-[#c3c0ff] font-bold ${mono.className}`}>{data.founder_distribution.Leader}% Density</span>
                  </div>
                  <div className="h-10 w-full flex bg-[#1a2122] rounded overflow-hidden border border-white/5">
                    <div className="h-full bg-[#8aebff]" style={{ width: '25%' }}></div>
                    <div className="h-full bg-[#c3c0ff] relative group" style={{ width: `${data.founder_distribution.Leader}%` }}>
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_50%,#fff_50%,#fff_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
                    </div>
                    <div className="h-full bg-[#ffd6a3]" style={{ width: '49%' }}></div>
                  </div>
                </div>
              </div>

              <div className={`mt-8 pt-4 border-t border-white/5 flex justify-between text-[10px] font-bold text-[#bbc9cd] uppercase tracking-widest ${mono.className}`}>
                <span>0% Density</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100% Saturation</span>
              </div>
            </div>
          </section>

          {/* Bottom: Intervention Feed */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-12">
              <button 
                className="w-full flex items-center justify-between mb-4 group p-2 hover:bg-white/5 transition-colors rounded"
                onClick={() => setInterventionCollapsed(!interventionCollapsed)}
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <ShieldAlert className={`text-[#ffb4ab] transition-transform ${interventionCollapsed ? '-rotate-90' : ''}`} />
                  Intervention Required
                </h3>
                <div className="flex items-center gap-4">
                  <span className={`bg-[#93000a] text-[#ffdad6] border border-[#ffdad6]/20 px-3 py-1 text-xs font-bold uppercase ${mono.className}`}>3 Critical Alerts</span>
                  <ChevronDown className={`text-[#bbc9cd] transition-transform ${interventionCollapsed ? '-rotate-90' : ''}`} />
                </div>
              </button>

              {!interventionCollapsed && (
                <div className="space-y-3 transition-all">
                  {data.support_needs.map((need: string, idx: number) => {
                    const isCritical = need.includes("Critical") || need.includes("Batch");
                    return (
                      <div key={idx} className="bg-[#161d1e] border-l-4 border-[#ffb4ab] p-6 flex flex-col md:flex-row items-center justify-between gap-6 group hover:bg-[#1a2122] transition-all rounded-r-lg">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <div className="w-12 h-12 bg-[#ffb4ab]/10 flex items-center justify-center border border-[#ffb4ab]/20 rounded shrink-0">
                            <TrendingDown className="text-[#ffb4ab] w-6 h-6" />
                          </div>
                          <div>
                            <h4 className={`text-white font-bold ${mono.className}`}>{need.split(' - ')[0]}</h4>
                            <p className="text-sm text-[#bbc9cd] mt-1">{need.split(' - ')[1] || "Automated risk vector detection identifies potential dropout pattern."}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-right">
                            <span className={`block text-[10px] text-[#bbc9cd] uppercase tracking-widest font-bold ${mono.className}`}>Priority Level</span>
                            <span className={`font-bold ${mono.className} ${isCritical ? 'text-[#ffb4ab]' : 'text-[#ffd6a3]'}`}>{isCritical ? 'CRITICAL' : 'ELEVATED'}</span>
                          </div>
                          <button className={`px-4 py-2 font-bold text-[11px] tracking-[0.1em] rounded transition-all active:scale-95 ${isCritical ? 'bg-[#ffb4ab] text-[#690005] hover:brightness-110' : 'border border-[#ffd6a3]/40 text-[#ffd6a3] hover:bg-[#ffd6a3]/10'}`}>
                            {isCritical ? 'SCHEDULE INTERVENTION' : 'VIEW DOSSIER'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Placement Funnel (Bento) */}
            <div className="md:col-span-5 bg-[#0f172a]/40 backdrop-blur-md p-6 border border-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-6">Placement Funnel</h3>
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-[#8aebff]/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#8aebff] shadow-[0_0_15px_rgba(47,217,244,0.5)]"></div>
                  <div className="flex justify-between items-center">
                    <span className={`text-white font-bold text-xs ${mono.className}`}>Assessment</span>
                    <span className={`text-[#8aebff] font-bold ${mono.className}`}>4,282</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a2122] mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-[#8aebff]" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="relative pl-8 border-l-2 border-[#8aebff]/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#8aebff]/60"></div>
                  <div className="flex justify-between items-center">
                    <span className={`text-white font-bold text-xs ${mono.className}`}>Shortlisted</span>
                    <span className={`text-[#8aebff] font-bold ${mono.className}`}>1,840</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a2122] mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-[#8aebff]/60" style={{ width: '43%' }}></div>
                  </div>
                </div>
                <div className="relative pl-8 border-l-2 border-[#8aebff]/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#c3c0ff]"></div>
                  <div className="flex justify-between items-center">
                    <span className={`text-white font-bold text-xs ${mono.className}`}>Interviewing</span>
                    <span className={`text-[#c3c0ff] font-bold ${mono.className}`}>612</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1a2122] mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-[#c3c0ff]" style={{ width: '14%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Pulse */}
            <div className="md:col-span-7 bg-[#0f172a]/40 backdrop-blur-md p-6 border border-white/10 rounded-xl flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Cohort Engagement Pulse</h3>
                  <p className="text-[#bbc9cd] text-xs mt-1">Daily active participation (Last 30 Days)</p>
                </div>
                <div className="text-right">
                  <span className={`block text-2xl text-[#8aebff] font-bold ${mono.className}`}>88%</span>
                  <span className={`text-[#10b981] text-[10px] font-bold ${mono.className}`}>+4.2% AVG</span>
                </div>
              </div>
              <div className="flex-grow flex items-end gap-1 h-32">
                {[40, 55, 45, 70, 65, 85, 90, 75, 60, 80, 95, 85, 70, 60, 50].map((h, i) => (
                  <div key={i} className="flex-grow bg-[#8aebff]/20 hover:bg-[#8aebff]/40 transition-all rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className={`mt-4 flex justify-between text-[10px] font-bold text-[#bbc9cd] uppercase tracking-widest ${mono.className}`}>
                <span>Day 1</span>
                <span>Day 15</span>
                <span>Today</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="mt-12 py-8 border-t border-white/5 bg-[#090f11]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black tracking-tighter text-[#bbc9cd]">c2c</span>
            <span className={`text-[10px] text-[#bbc9cd] uppercase tracking-[0.2em] font-bold ${mono.className}`}>Enterprise Core v2.4.0</span>
          </div>
          <div className={`flex gap-8 text-[#bbc9cd] text-[10px] font-bold ${mono.className}`}>
            <a className="hover:text-[#8aebff] transition-colors" href="#">SECURITY PROTOCOL</a>
            <a className="hover:text-[#8aebff] transition-colors" href="#">DATA PRIVACY</a>
            <a className="hover:text-[#8aebff] transition-colors" href="#">SYSTEM STATUS: OPERATIONAL</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
