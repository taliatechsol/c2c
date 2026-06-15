"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  LayoutGrid, 
  List, 
  Download, 
  FileText, 
  Bookmark, 
  X, 
  MoreVertical, 
  Zap, 
  HelpCircle, 
  LogOut,
  Plus,
  CheckCircle,
  Search
} from "lucide-react";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });
const mono = JetBrains_Mono({ subsets: ["latin"] });

// High-fidelity Mock Data from Stitch
const MOCK_CANDIDATES = [
  {
    id: "4421",
    name: "Alex Vance",
    role: "Senior Systems Arch",
    cohort: "Cohort A",
    match: 98,
    iq: 142,
    eq: 88,
    aq: 94,
    sq: 76,
    skills: ["Dist. Systems", "Cloud Security", "Go / Rust"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPw920PJwfJVAZ3gDOUcw9dhT4LzRNvwpw466ClpJrEOdSfGxJo1u5DH0SeuGlDnkGxusy7qE1AvimqJwkDcRBrtoxJEtZxUIx7OHVuBYB2AfNCPrE6HDjXiM0U5YtsBISs6hGqzLcEG1NofoHR_yHP3QZ41FvLfLMAlGrykK4eScwexMnc1bwAjLk3M_hEtKg-j78bD1fvnKyuMuTUDcrx62TRQ3vj5h5CkySJZUNQonQxDsyE4zMKv9UqYNT72T_5WEF2niiEo7g",
    status: "online",
    summary: "A rare talent combining deep systems architecture knowledge with the agility of a startup founder. Has a documented history of scaling infrastructure from 0 to 10M+ daily active users while maintaining 99.99% uptime."
  },
  {
    id: "4422",
    name: "Sarah Chen",
    role: "ML Engineering",
    cohort: "Cohort C",
    match: 92,
    iq: 155,
    eq: 92,
    aq: 88,
    sq: 99,
    skills: ["Deep Learning", "PyTorch", "LLM Ops"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YBhnRnetEnTnCpSXPQWEzKtAdIZkz7x9dj7kJQ3VT8-GhSZGU_67yFDWEfNXQHsxQfGcxf1ujgMcW323_hUh-cuBU6ZrwYcIjJ38VuUFG1uej6VWalLTP3YiMLuxXQqtJvFBnzYUd588BlzgLlbcZJ7pBvulOuYHZ2slMFuhATSdSxNsOZnbH-KghREa7hzM1BWhnCm6GvQIQ0MqwHvGkhi26DeXq4CF5PzZLaQry4HgQKHLU3jvsjiV28X5F5SU-BGg21i8WpQ7",
    status: "away",
    summary: "Machine Learning specialist with a focus on large-scale model deployment and optimization. Expert in neural network architecture and data pipeline engineering."
  },
  {
    id: "4423",
    name: "Jordan Miller",
    role: "Fullstack Eng",
    cohort: "Cohort B",
    match: 89,
    iq: 138,
    eq: 95,
    aq: 82,
    sq: 91,
    skills: ["TypeScript", "React / Next.js", "Node.js"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9FQmcLDt5ZGEMNzgc5_RmPOFrcOEyHiNh1pIQPuvCBo_1kSr0K6rOrVC-BUbhYsZNhobnpCBS28b5B6OgsD5MTMDsKjcTO69eErktwgBXcoGGrb94S_MdTzBh8fnV0SSzJbaJGDengtdJhTd9ucWqRVnxPpQC4HlaRo0IJgDpbe8TC7fwP1aeTLrfey7xRW8n9PsOzR1nsApJMZEQlWAMdGz7PuQnR44b9L11nK9WSrOyoFs0Kfj-K1DJDEhzYswpoNSzko6i2noA",
    status: "online",
    summary: "Versatile fullstack developer with a passion for building intuitive user experiences and robust backend systems. Strong advocate for clean code and TDD."
  },
  {
    id: "4424",
    name: "Marcus Thorne",
    role: "DevOps Lead",
    cohort: "Cohort A",
    match: 87,
    iq: 135,
    eq: 81,
    aq: 96,
    sq: 84,
    skills: ["Kubernetes", "Terraform", "CI/CD Arch"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuiCobdri_hZLcv281QILWRRMLv_ngZb4qUwQOZEyPbx63isyeisxjbT7Y_uF3Mk5ZcWOfGWPl88USJk-kSIPgHbz9p2-aoqkS1w82fMb6fvG9MgFlG-8moElp6a-mxYWol51MnAI5K0-Wd0k4bzy4Aow3sP3pcbN1YXTrXdemustn_cGyGVUd0sjjJHXQecInmqQoTpjq4g0pc0uKKPHDrh1z7sz5DMBDqgOutwJB_r2kIu35tc_xBaXaBAeh8W9p4xChw5lu7S3z",
    status: "online",
    summary: "Cloud infrastructure expert specializing in container orchestration and automated deployment pipelines. Proven track record in improving system reliability and developer productivity."
  }
];

export default function EmployerPage() {
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [strictFounderFit, setStrictFounderFit] = useState(false);
  const [minAQ, setMinAQ] = useState(82);
  const [minEQ, setMinEQ] = useState(75);

  useEffect(() => {
    // Optionally fetch leads from API
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        if (res.ok) {
          const data = await res.json();
          // If data has actual candidates, we could merge or replace
          console.log("Fetched leads:", data);
        }
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      }
    };
    fetchLeads();
  }, []);

  const togglePanel = (candidate?: any) => {
    if (candidate) {
      setSelectedCandidate(candidate);
      setPanelVisible(true);
    } else {
      setPanelVisible(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0e1416] text-[#dde4e5] overflow-hidden ${hanken.className}`}>
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0e1416]/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-12">
          <span className={`text-3xl font-extrabold tracking-tighter text-[#8aebff] ${hanken.className}`}>c2c</span>
          <div className="hidden md:flex gap-6">
            <a className="text-sm text-[#bbc9cd] hover:text-[#8aebff] transition-colors" href="#">Assessment</a>
            <a className="text-sm text-[#bbc9cd] hover:text-[#8aebff] transition-colors" href="#">Dashboard</a>
            <a className="text-sm text-[#bbc9cd] hover:text-[#8aebff] transition-colors" href="#">Analytics</a>
            <a className="text-sm text-[#8aebff] border-b-2 border-[#8aebff] pb-1" href="#">Employer View</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-[#bbc9cd] hover:bg-white/5 px-4 py-2 rounded transition-all duration-300">Switch Profile</button>
          <div className="w-10 h-10 rounded-full border border-[#8aebff]/20 overflow-hidden">
            <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYAFKIYxGCtT7e5yefCAETX_pq16Cvr0wYmz30LnbDHXY6RiJdTlCme8ZoRmFWunCoIb7yAhmxTAiy_VqzzpJh0Bt5H75ol7OO1fKnmPfBbl9faZ-X6aTBuhJMYA35DkhWaCXUj1d_8b9M_9jPVOtwfVNUtIz0cIN0NCRk2uvAi8W6Tz_ILmhpyr5ImYTlJPxwsrDBAZIIJArB-FTkKEFriZhb15stMWf4ZDNfvsb6pVsh8fefAshK4uXfzXprcDwAebuXsgN0YkgW"/>
          </div>
        </div>
      </nav>

      <div className="flex h-screen pt-[72px]">
        {/* Left Sidebar: Filters */}
        <aside className="hidden lg:flex flex-col w-80 bg-[#1a2122]/90 backdrop-blur-2xl border-r border-white/5 overflow-y-auto shrink-0">
          <div className="p-6 space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-[#8aebff] mb-1">Recruiter Console</h2>
              <p className={`text-[12px] font-bold tracking-[0.1em] text-[#bbc9cd] opacity-70 ${mono.className}`}>ENTERPRISE TIER</p>
            </div>

            {/* Strict Founder Fit Toggle */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Strict Founder Fit</label>
                <button 
                  className={`w-10 h-5 rounded-full relative transition-colors ${strictFounderFit ? 'bg-[#8aebff]' : 'bg-[#8aebff]/20'}`} 
                  onClick={() => setStrictFounderFit(!strictFounderFit)}
                >
                  <span className={`absolute top-1 w-3 h-3 bg-[#8aebff] rounded-full transition-all ${strictFounderFit ? 'right-1' : 'left-1 bg-white'}`}></span>
                </button>
              </div>
              <p className="text-[11px] text-[#bbc9cd] leading-tight">Prioritize candidates with high adaptability and high-growth potential scores.</p>
            </div>

            {/* Sliders */}
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Min AQ Score</span>
                  <span className={`text-sm font-medium tracking-[0.05em] text-[#8aebff] ${mono.className}`}>{minAQ}</span>
                </div>
                <input 
                  className="w-full h-1 bg-[#2f3638] rounded-lg appearance-none cursor-pointer accent-[#8aebff]" 
                  type="range" 
                  value={minAQ}
                  onChange={(e) => setMinAQ(parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Min EQ Score</span>
                  <span className={`text-sm font-medium tracking-[0.05em] text-[#8aebff] ${mono.className}`}>{minEQ}</span>
                </div>
                <input 
                  className="w-full h-1 bg-[#2f3638] rounded-lg appearance-none cursor-pointer accent-[#8aebff]" 
                  type="range" 
                  value={minEQ}
                  onChange={(e) => setMinEQ(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Advanced Skill Tags */}
            <div className="space-y-4">
              <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Required Competencies</span>
              <div className="flex flex-wrap gap-1">
                <span className={`px-2 py-1 bg-[#8aebff]/10 text-[#8aebff] text-[10px] font-medium tracking-[0.05em] rounded border border-[#8aebff]/20 ${mono.className}`}>TypeScript</span>
                <span className={`px-2 py-1 bg-white/5 text-[#bbc9cd] text-[10px] font-medium tracking-[0.05em] rounded border border-white/10 ${mono.className}`}>Rust</span>
                <span className={`px-2 py-1 bg-white/5 text-[#bbc9cd] text-[10px] font-medium tracking-[0.05em] rounded border border-white/10 ${mono.className}`}>LLM Fine-tuning</span>
                <span className={`px-2 py-1 bg-white/5 text-[#bbc9cd] text-[10px] font-medium tracking-[0.05em] rounded border border-white/10 ${mono.className}`}>Solidity</span>
              </div>
            </div>

            <button className="w-full bg-[#3626ce] text-[#b3b1ff] py-4 text-[12px] font-bold tracking-[0.1em] rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              POST NEW JOB
            </button>
          </div>
          
          <div className="mt-auto p-6 border-t border-white/5 space-y-2">
            <div className="flex items-center gap-4 text-[#bbc9cd] hover:text-white transition-colors cursor-pointer group">
              <HelpCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Support</span>
            </div>
            <div className="flex items-center gap-4 text-[#bbc9cd] hover:text-white transition-colors cursor-pointer group">
              <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span className={`text-[12px] font-bold tracking-[0.1em] ${mono.className}`}>Logout</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden bg-[#0e1416]">
          <div className="relative z-10 h-full p-6 overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="text-[#8aebff] w-6 h-6" />
                  <h1 className="text-3xl font-extrabold text-[#dde4e5] tracking-tight leading-none">Talent Pool</h1>
                </div>
                <p className={`text-[#bbc9cd] text-sm tracking-[0.05em] font-medium ${mono.className}`}>Displaying {candidates.length} elite matches for "Senior Systems Architect" • Cohort 2024.1</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center bg-[#1a2122] rounded-lg p-1 border border-white/10">
                  <button className="p-2 bg-[#8aebff]/20 text-[#8aebff] rounded-md">
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[#bbc9cd] hover:text-[#dde4e5]">
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0f172a]/40 backdrop-blur-md rounded-lg border border-white/10 text-[#dde4e5] text-sm transition-all hover:border-[#8aebff]/40">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Candidate Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-12">
              {candidates.map((candidate) => (
                <div 
                  key={candidate.id} 
                  className="bg-[#0f172a]/40 backdrop-blur-md rounded-xl overflow-hidden flex flex-col group border border-white/5 hover:border-[#8aebff]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(47,217,244,0.1)]"
                >
                  <div className="p-6 space-y-6 flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-lg border border-[#8aebff]/30 overflow-hidden shrink-0">
                            <img alt={candidate.name} className="w-full h-full object-cover" src={candidate.image}/>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-2 border-[#0e1416] rounded-full ${candidate.status === 'online' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#dde4e5] leading-tight group-hover:text-[#8aebff] transition-colors">{candidate.name}</h3>
                          <p className={`text-[12px] text-[#bbc9cd] font-medium uppercase tracking-[0.05em] ${mono.className}`}>{candidate.role} • {candidate.cohort}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[10px] font-medium tracking-[0.05em] text-[#8aebff]/70 mb-0.5 ${mono.className}`}>MATCH</div>
                        <div className="text-2xl font-bold text-[#8aebff]">{candidate.match}%</div>
                      </div>
                    </div>

                    {/* Mini Radar Chart (SVG) */}
                    <div className="flex items-center justify-between gap-4 py-2 border-y border-white/5">
                      <div className="w-24 h-24 shrink-0 relative">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <polygon className="stroke-white/10 stroke-[0.5] fill-none" points="50,5 93,30 93,80 50,105 7,80 7,30" transform="scale(0.8) translate(12.5, 12.5)"></polygon>
                          <polygon className="stroke-white/10 stroke-[0.5] fill-none" points="50,25 72,38 72,63 50,75 28,63 28,38" transform="scale(0.8) translate(12.5, 12.5)"></polygon>
                          <polygon className="fill-[#2fd9f4]/30 stroke-[#2fd9f4] stroke-[1.5]" points="50,15 88,35 70,85 40,90 20,40" transform="scale(0.8) translate(12.5, 12.5)"></polygon>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className={`text-[8px] font-medium tracking-[0.05em] text-[#8aebff]/40 ${mono.className}`}>CORE</span>
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex flex-col">
                          <span className={`text-[9px] text-[#bbc9cd] font-bold tracking-[0.1em] ${mono.className}`}>IQ</span>
                          <span className="text-xs font-bold text-[#dde4e5]">{candidate.iq}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[9px] text-[#bbc9cd] font-bold tracking-[0.1em] ${mono.className}`}>EQ</span>
                          <span className="text-xs font-bold text-[#dde4e5]">{candidate.eq}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[9px] text-[#bbc9cd] font-bold tracking-[0.1em] ${mono.className}`}>AQ</span>
                          <span className="text-xs font-bold text-[#dde4e5]">{candidate.aq}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[9px] text-[#bbc9cd] font-bold tracking-[0.1em] ${mono.className}`}>SQ</span>
                          <span className="text-xs font-bold text-[#dde4e5]">{candidate.sq}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className={`text-[10px] font-bold tracking-[0.1em] text-[#bbc9cd] ${mono.className}`}>TOP SKILLS</span>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#3626ce]/20 text-[#c3c0ff] text-[10px] rounded border border-[#c3c0ff]/20">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
                    <button 
                      className="flex-1 bg-[#8aebff] text-[#00363e] text-[11px] font-bold tracking-[0.1em] py-2 rounded hover:brightness-110 transition-all flex items-center justify-center gap-2"
                      onClick={() => togglePanel(candidate)}
                    >
                      <FileText className="w-3 h-3" />
                      VIEW DOSSIER
                    </button>
                    <button className="w-10 h-9 flex items-center justify-center rounded border border-white/10 hover:bg-white/10 text-[#bbc9cd] transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail View: Sliding Right Panel */}
          <div 
            className={`absolute top-0 right-0 w-full md:w-[480px] h-full bg-[#242b2d]/95 backdrop-blur-3xl z-40 border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${panelVisible ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {selectedCandidate && (
              <>
                <div className="p-6 flex justify-between items-center border-b border-white/5">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors" onClick={() => togglePanel()}>
                    <X className="w-5 h-5" />
                  </button>
                  <span className={`text-[12px] font-bold tracking-[0.1em] text-[#8aebff] ${mono.className}`}>CANDIDATE DOSSIER</span>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
                    <MoreVertical className="w-5 h-5 text-[#bbc9cd]" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-12">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full border-2 border-[#8aebff]/50 p-1 mb-4 shadow-[0_0_20px_rgba(47,217,244,0.3)]">
                      <img alt={selectedCandidate.name} className="w-full h-full rounded-full object-cover" src={selectedCandidate.image}/>
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#dde4e5]">{selectedCandidate.name}</h2>
                    <p className={`text-[#8aebff] text-sm font-medium tracking-[0.05em] ${mono.className}`}>Elite Candidate #{selectedCandidate.id} • Tier 1</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className={`text-[12px] font-bold tracking-[0.1em] text-[#bbc9cd] ${mono.className}`}>Professional Legend</h4>
                    <div className="bg-[#0f172a]/40 backdrop-blur-md p-4 rounded-lg text-sm text-[#dde4e5] leading-relaxed border-l-2 border-[#8aebff] border-white/5">
                      "{selectedCandidate.summary}"
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0f172a]/40 backdrop-blur-md p-4 rounded-lg border border-white/5 text-center">
                      <p className={`text-[10px] font-bold tracking-[0.1em] text-[#bbc9cd] mb-1 ${mono.className}`}>AQ SCORE</p>
                      <p className="text-2xl font-bold text-[#8aebff]">{selectedCandidate.aq}</p>
                    </div>
                    <div className="bg-[#0f172a]/40 backdrop-blur-md p-4 rounded-lg border border-white/5 text-center">
                      <p className={`text-[10px] font-bold tracking-[0.1em] text-[#bbc9cd] mb-1 ${mono.className}`}>IQ SCORE</p>
                      <p className="text-2xl font-bold text-[#c3c0ff]">{selectedCandidate.iq}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className={`text-[12px] font-bold tracking-[0.1em] text-[#bbc9cd] ${mono.className}`}>Verified Skills</h4>
                      <span className="text-[10px] text-[#8aebff] bg-[#8aebff]/10 px-2 py-0.5 rounded border border-[#8aebff]/20">Trust Level: HIGH</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 rounded hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                        <span className="text-sm">Infrastructure Security</span>
                        <CheckCircle className="w-4 h-4 text-[#8aebff] group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex justify-between items-center p-3 rounded hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                        <span className="text-sm">Reactive Systems</span>
                        <CheckCircle className="w-4 h-4 text-[#8aebff] group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex justify-between items-center p-3 rounded hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                        <span className="text-sm">Team Leadership</span>
                        <CheckCircle className="w-4 h-4 text-[#8aebff] group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-white/5 bg-[#2f3638]/50">
                  <button className="w-full bg-[#8aebff] text-[#00363e] py-6 text-[12px] font-bold tracking-[0.1em] rounded hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(47,217,244,0.3)] mb-3 flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5 fill-[#00363e]" />
                    REQUEST INTRODUCTION
                  </button>
                  <button className="w-full border border-white/10 text-[#dde4e5] py-4 text-[12px] font-bold tracking-[0.1em] rounded hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    SAVE TO TALENT POOL
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
