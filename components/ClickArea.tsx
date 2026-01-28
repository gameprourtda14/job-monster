import React, { useState } from 'react';
import { Briefcase, Building2, Coins, TrendingUp } from 'lucide-react';
import { ClickEffect } from '../types';

interface OfficeViewProps {
  onMainClick: (e: React.MouseEvent) => void;
  clickValue: number;
  graphicsHigh: boolean;
  incomePerSecond: number;
}

export const ClickArea: React.FC<OfficeViewProps> = ({ onMainClick, clickValue, graphicsHigh, incomePerSecond }) => {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  // If player has passive income, they can't click anymore.
  const isManagementMode = incomePerSecond > 0;

  const handleAreaClick = (e: React.MouseEvent) => {
    if (isManagementMode) return; // Disable clicking in management mode

    if (graphicsHigh) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newEffect: ClickEffect = {
        id: Date.now() + Math.random(),
        x,
        y,
        value: clickValue
      };

      setClickEffects(prev => [...prev, newEffect]);
      setTimeout(() => {
        setClickEffects(prev => prev.filter(eff => eff.id !== newEffect.id));
      }, 800);
    }

    onMainClick(e);
  };

  if (isManagementMode) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative bg-slate-950 overflow-hidden min-h-[400px]">
        {/* Management Dashboard View */}
        <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
          <div className="inline-block p-4 rounded-full bg-emerald-500/10 mb-4 animate-pulse">
            <Building2 size={64} className="text-emerald-500" />
          </div>
          
          <h2 className="text-4xl font-bold text-white tracking-tight">Holding Merkezi</h2>
          <p className="text-slate-400 text-lg">
            İmparatorluğun tıkır tıkır işliyor. Yeni sektörlere yatırım yapmak için mağazayı kullan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              <div className="text-slate-500 text-sm mb-1">Durum</div>
              <div className="text-emerald-400 font-bold flex items-center justify-center gap-2">
                <TrendingUp size={18} />
                Büyüyor
              </div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              <div className="text-slate-500 text-sm mb-1">Yönetim</div>
              <div className="text-blue-400 font-bold">Otomatik</div>
            </div>
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
              <div className="text-slate-500 text-sm mb-1">Ofis</div>
              <div className="text-purple-400 font-bold">Genel Merkez</div>
            </div>
          </div>
        </div>

        {/* Ambient background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
        </div>
      </div>
    );
  }

  // Initial Manual Labor View
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative bg-slate-950 overflow-hidden min-h-[400px]">
      <div className="relative z-10 text-center space-y-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Sıfırdan Başla</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Henüz hiç iş yerin yok. İlk sermayeni biriktirmek için manuel çalışmalısın. Bir lisans aldığında bu işkence bitecek.
        </p>
        
        <button
          onClick={handleAreaClick}
          className="group relative w-64 h-20 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 shadow-xl active:scale-95 transition-all duration-100 flex items-center justify-center gap-4 border border-slate-600"
        >
          <div className="bg-slate-900 p-2 rounded-lg">
            <Briefcase size={24} className="text-slate-300" />
          </div>
          <div className="text-left">
             <div className="text-sm text-slate-400">Tıkla ve Çalış</div>
             <div className="text-lg font-bold text-white">+${clickValue}</div>
          </div>
        </button>
      </div>

      {/* Floating Numbers */}
      {clickEffects.map(effect => (
        <div
          key={effect.id}
          className="absolute text-xl font-bold text-slate-300 pointer-events-none animate-float select-none flex items-center gap-1"
          style={{ left: effect.x, top: effect.y }}
        >
          <Coins size={16} className="text-yellow-500" />
          +${effect.value.toFixed(0)}
        </div>
      ))}
    </div>
  );
};