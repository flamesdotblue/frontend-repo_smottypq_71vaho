import React from 'react';
import { Users, Activity, DollarSign, TrendingUp } from 'lucide-react';

const Stat = ({ icon: Icon, label, value, trend }) => (
  <div className="rounded-2xl border border-black/5 bg-white/80 backdrop-blur p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-600">
        <Icon className="h-4 w-4" />
        <span className="text-xs">{label}</span>
      </div>
      <span className={`text-xs ${trend?.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{trend}</span>
    </div>
    <div className="mt-3 text-2xl font-semibold text-slate-800">{value}</div>
  </div>
);

const StatsCards = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={Users} label="Total Users" value="2,482" trend="+3.4%" />
        <Stat icon={Activity} label="Active" value="1,873" trend="+1.2%" />
        <Stat icon={TrendingUp} label="Conversion" value="34%" trend="+0.7%" />
        <Stat icon={DollarSign} label="MRR" value="$42k" trend="+5.1%" />
      </div>
    </section>
  );
};

export default StatsCards;
