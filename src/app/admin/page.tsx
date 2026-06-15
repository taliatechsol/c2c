"use client";

import { useEffect, useState } from "react";
import { Users, Activity, CheckCircle2, AlertCircle, Server, Radio, Database } from "lucide-react";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/leads");
        if (!res.ok) throw new Error("Failed to fetch leads");
        const data = await res.json();
        setLeads(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 dark">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-cyan-900/30 pb-6 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 font-mono text-3xl font-black uppercase tracking-tight text-white">
              <Activity className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              Global Admin Root
            </h1>
            <p className="mt-2 font-mono text-sm text-cyan-500/70">
              REAL-TIME PLATFORM METRICS & MARKET INTELLIGENCE
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-cyan-800/50 bg-cyan-950/30 px-4 py-1.5 font-mono text-xs text-cyan-400">
            <Radio className="h-3 w-3 animate-pulse text-cyan-400" />
            <span>SYSTEM_ONLINE</span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl border border-blue-900/30 bg-slate-900/50 p-6 shadow-[0_0_15px_rgba(59,130,246,0.05)] backdrop-blur-sm transition-all hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20" />
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-800 bg-blue-950/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                <Server className="h-6 w-6" />
              </div>
              <div className="ml-5">
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-blue-400/70">Active Nodes</p>
                <p className="mt-1 font-mono text-3xl font-bold text-blue-50 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">1</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-emerald-900/30 bg-slate-900/50 p-6 shadow-[0_0_15px_rgba(16,185,129,0.05)] backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-all group-hover:bg-emerald-500/20" />
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-800 bg-emerald-950/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-5">
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-emerald-400/70">Users Verified</p>
                <p className="mt-1 font-mono text-3xl font-bold text-emerald-50 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">42</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-purple-900/30 bg-slate-900/50 p-6 shadow-[0_0_15px_rgba(168,85,247,0.05)] backdrop-blur-sm transition-all hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all group-hover:bg-purple-500/20" />
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-purple-800 bg-purple-950/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <Database className="h-6 w-6" />
              </div>
              <div className="ml-5">
                <p className="font-mono text-xs font-medium uppercase tracking-wider text-purple-400/70">Market Entities</p>
                <p className="mt-1 font-mono text-3xl font-bold text-purple-50 drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
                  {loading ? <span className="animate-pulse">...</span> : leads.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-hidden rounded-xl border border-cyan-900/30 bg-slate-900/50 shadow-[0_0_20px_rgba(6,182,212,0.05)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-cyan-900/30 bg-slate-900/80 px-6 py-4">
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-cyan-100">Market Leads Stream</h2>
            <span className="inline-flex items-center gap-1.5 rounded border border-emerald-800/50 bg-emerald-950/30 px-2 py-1 font-mono text-[10px] uppercase text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> Live Sync
            </span>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12">
                <Activity className="mb-4 h-8 w-8 animate-pulse text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <p className="font-mono text-xs text-cyan-500/70 uppercase">Establishing connection to databank...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center p-12 text-red-500">
                <AlertCircle className="mb-3 h-10 w-10 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <p className="font-mono text-sm">ERR_CONNECTION: {error}</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                <Database className="mb-3 h-10 w-10 opacity-50" />
                <p className="font-mono text-sm">NO_RECORDS_FOUND</p>
              </div>
            ) : (
              <table className="w-full text-left font-mono text-sm border-collapse">
                <thead>
                  <tr className="border-b border-cyan-900/30 bg-slate-950/50">
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cyan-500/70">Identifier / Role</th>
                    <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-cyan-500/70">Target Vector / Entity</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-cyan-500/70">Confidence Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-900/20">
                  {leads.map((lead, idx) => (
                    <tr key={lead.id || idx} className="group transition-colors hover:bg-cyan-950/20">
                      <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-cyan-100">
                        {lead.job_title || lead.title || 'UNKNOWN_ROLE'}
                      </td>
                      <td className="px-6 py-4 text-slate-400 group-hover:text-cyan-200">
                        {lead.company || lead.company_name || 'UNKNOWN_ENTITY'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center justify-center rounded border border-cyan-800/50 bg-cyan-950/30 px-2 py-1 text-xs font-bold text-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.2)]">
                          {lead.ai_score !== undefined ? lead.ai_score : '-'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
