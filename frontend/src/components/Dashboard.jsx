import React from 'react';
import { ArrowLeft, TrendingUp, ShieldAlert, Target, Info } from 'lucide-react';
import Charts from './Charts';

export default function Dashboard({ data, onReset }) {
  const {
    savings_rate,
    fire_corpus,
    emergency_fund,
    years_to_fire,
    sip_recommendations,
    asset_allocation,
    ai_mentor_summary
  } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <button 
        onClick={onReset}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} /> Recalculate Plan
      </button>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald-500">
          <p className="text-slate-400 text-sm font-medium mb-1">Time to FIRE</p>
          <div className="text-4xl font-extrabold text-white flex items-end gap-2">
            {years_to_fire} <span className="text-xl text-slate-500 font-medium pb-1">years</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-teal-500">
          <p className="text-slate-400 text-sm font-medium mb-1">Target FIRE Corpus</p>
          <div className="text-3xl font-bold text-white tracking-tight">
            {formatCurrency(fire_corpus)}
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-500">
          <p className="text-slate-400 text-sm font-medium mb-1">Current Savings Rate</p>
          <div className="text-3xl font-bold text-white">
            {(savings_rate * 100).toFixed(1)}%
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-rose-500">
          <p className="text-slate-400 text-sm font-medium mb-1">Emergency Fund Need</p>
          <div className="text-3xl font-bold text-white">
            {formatCurrency(emergency_fund)}
          </div>
        </div>
      </div>

      {/* AI Mentor Insights */}
      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="flex items-center gap-3 mb-6 relative">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 pb-1">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold text-white">AI Mentor Guidance</h2>
        </div>
        <div className="prose prose-invert prose-emerald max-w-none text-slate-300 relative leading-relaxed whitespace-pre-wrap">
          {ai_mentor_summary}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SIP Recommendations */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="text-primary" /> Goal-Based SIPs
          </h3>
          {sip_recommendations.length > 0 ? (
            <div className="space-y-4">
              {sip_recommendations.map((rec, idx) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl flex items-center justify-between border border-white/5">
                  <div>
                    <h4 className="font-semibold text-white text-lg">{rec.goal_name}</h4>
                    <p className="text-slate-400 text-sm">Target: {formatCurrency(rec.target_amount)} • {rec.years_to_goal} years left</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-emerald-400/80 mb-1 tracking-wide uppercase font-semibold">Suggested SIP</p>
                    <p className="font-bold text-xl text-emerald-400">{formatCurrency(rec.suggested_monthly_sip)}<span className="text-sm font-normal text-slate-500">/mo</span></p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-12 text-slate-400 bg-slate-800/30 rounded-xl border border-dashed border-white/10">
               <Info className="mx-auto mb-3 text-slate-500" size={32} />
               No specific goals provided.
             </div>
          )}
        </div>

        {/* Charts */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-primary" /> Asset Allocation
          </h3>
          <Charts allocation={asset_allocation} />
        </div>
      </div>
    </div>
  );
}
