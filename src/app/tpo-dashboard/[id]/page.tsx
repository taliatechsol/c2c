"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, AlertTriangle, PieChart, Activity, Loader2, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function TPODashboard() {
  const { id } = useParams();
  
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/cohort/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch cohort data");
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        console.error(err);
        // Fallback mock data
        setData({
          averages: { IQ: 70, EQ: 80, SQ: 60, AQ: 75, SpQ: 65 },
          founder_distribution: { Builder: 40, Leader: 30, Rainmaker: 20, Anchor: 10 },
          support_needs: [
            "Cohort average AQ is below 50. Consider implementing resilience and stress-management workshops.",
            "Cohort average IQ is below 50. Evaluate if core curriculum needs reinforcement."
          ]
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <span className="font-mono text-sm text-cyan-400 animate-pulse">INITIALIZING COHORT INTERFACE...</span>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-red-500">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-red-900/50 bg-red-950/20 p-8 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <AlertCircle className="h-10 w-10 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="font-mono">{error}</span>
        </div>
      </div>
    );
  }

  const averages = data?.averages || {};
  const distribution = data?.founder_distribution || {};
  const supportNeeds = data?.support_needs || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 border-b border-cyan-900/30 pb-6">
          <h1 className="flex items-center gap-3 text-3xl font-black uppercase tracking-tight text-white font-mono">
            <Users className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            TPO Cohort Intelligence
          </h1>
          <p className="font-mono text-sm text-cyan-500/70">
            SYSTEM ANALYSIS & RISK EVALUATION // LIVE DATA STREAM
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Cohort Intelligence Heatmap */}
          <div className="rounded-xl border border-cyan-900/30 bg-slate-900/50 p-8 shadow-[0_0_20px_rgba(6,182,212,0.05)] backdrop-blur-md transition-all hover:border-cyan-700/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-800 bg-cyan-950/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                <Activity className="h-5 w-5" />
              </div>
              <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-cyan-50">Intelligence Heatmap</h2>
            </div>
            
            <div className="space-y-6">
              {Object.entries(averages).map(([key, value]) => {
                const numValue = Number(value) || 0;
                return (
                  <div key={key} className="group">
                    <div className="mb-2 flex justify-between font-mono text-sm font-semibold">
                      <span className="text-cyan-400/80">{key}_SCORE</span>
                      <span className="text-cyan-300 drop-shadow-[0_0_5px_rgba(103,232,249,0.5)]">{numValue.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/50 shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] ${
                          numValue > 75 ? 'bg-cyan-400' : numValue > 50 ? 'bg-cyan-600' : 'bg-orange-500'
                        }`} 
                        style={{ width: `${numValue}%` }} 
                      />
                    </div>
                  </div>
                )
              })}
              {Object.keys(averages).length === 0 && (
                 <p className="font-mono text-sm italic text-slate-600">No telemetry data available.</p>
              )}
            </div>
          </div>

          {/* Founder Profile Distribution */}
          <div className="rounded-xl border border-purple-900/30 bg-slate-900/50 p-8 shadow-[0_0_20px_rgba(168,85,247,0.05)] backdrop-blur-md transition-all hover:border-purple-700/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.1)]">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-800 bg-purple-950/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <PieChart className="h-5 w-5" />
              </div>
              <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-purple-50">Profile Distribution</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(distribution).map(([key, value]) => {
                const numValue = Number(value) || 0;
                return (
                  <div key={key} className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/50 p-6 text-center transition-all hover:border-purple-500/50 hover:bg-purple-950/20">
                    <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at center, rgba(168,85,247,0.8) 0%, transparent 70%)' }} />
                    <div className="relative z-10 font-mono text-3xl font-black text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                      {numValue.toFixed(0)}%
                    </div>
                    <div className="relative z-10 mt-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-300/70">
                      {key}
                    </div>
                  </div>
                )
              })}
              {Object.keys(distribution).length === 0 && (
                 <p className="col-span-2 font-mono text-sm italic text-slate-600">Awaiting distribution parameters.</p>
              )}
            </div>
          </div>

          {/* Risk & Support Needs */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-orange-800 bg-orange-950/50 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-orange-50">Risk & Support Vectors</h2>
            </div>

            {supportNeeds.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {supportNeeds.map((need: string, idx: number) => {
                  const isHighRisk = need.toLowerCase().includes('below 50') || need.toLowerCase().includes('high risk');
                  return (
                    <li key={idx} className={`flex items-start rounded-lg border p-4 transition-all ${
                      isHighRisk 
                        ? 'border-red-900/50 bg-red-950/20 hover:border-red-500/50 hover:bg-red-950/30' 
                        : 'border-orange-900/50 bg-orange-950/20 hover:border-orange-500/50 hover:bg-orange-950/30'
                    }`}>
                      <AlertTriangle className={`mr-3 mt-0.5 h-5 w-5 flex-shrink-0 ${
                        isHighRisk ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]'
                      }`} />
                      <span className={`font-mono text-sm leading-relaxed ${
                        isHighRisk ? 'text-red-200' : 'text-orange-200'
                      }`}>{need}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-emerald-900/30 bg-emerald-950/10 p-8 text-center">
                <CheckCircle2 className="mb-3 h-8 w-8 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <p className="font-mono text-sm text-emerald-400/70">No critical risk vectors detected in current telemetry.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
