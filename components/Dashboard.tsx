import React from 'react';
import { GameState, ItemType, Mission } from '../types';
import { User, DollarSign, Zap, Crown, Map, Car, Building2, Gem, Target, Settings, CheckCircle, Trophy } from 'lucide-react';

interface DashboardProps {
  gameState: GameState;
  incomePerSecond: number;
  currentMission?: Mission;
  onClaimMission: () => void;
  onOpenSettings: () => void;
  onOpenLeaderboard: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  gameState, 
  incomePerSecond, 
  currentMission, 
  onClaimMission,
  onOpenSettings,
  onOpenLeaderboard
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(num);
  };

  const countByType = (type: ItemType) => {
    return gameState.items.filter(i => i.type === type && i.owned > 0).reduce((acc, curr) => acc + curr.owned, 0);
  };

  // Check mission progress to show progress bar or claim button
  const getMissionProgress = () => {
    if (!currentMission) return 0;
    let current = 0;
    if (currentMission.type === 'MONEY') current = gameState.money;
    if (currentMission.type === 'OWNED_TOTAL') current = gameState.items.reduce((acc, i) => acc + i.owned, 0);
    // Simple mock for other types
    return Math.min(100, (current / currentMission.target) * 100);
  };

  const isMissionComplete = getMissionProgress() >= 100;

  return (
    <div className="bg-slate-900 border-r border-slate-800 w-full lg:w-80 h-auto lg:h-screen p-6 flex flex-col gap-6 overflow-y-auto shrink-0 relative">
      
      {/* Top Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
         <button 
          onClick={onOpenLeaderboard}
          className="p-2 text-yellow-500 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-all"
          title="Sıralama"
        >
          <Trophy size={20} />
        </button>
        <button 
          onClick={onOpenSettings}
          className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          title="Ayarlar"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* User Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-800 mr-16">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-2xl font-bold shadow-lg">
          {gameState.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white truncate max-w-[150px]">{gameState.username}</h2>
          <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
            <Crown size={14} />
            <span>Seviye {gameState.level}</span>
          </div>
        </div>
      </div>

      {/* Mission Card */}
      {currentMission ? (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-xs font-bold text-yellow-500 uppercase flex items-center gap-1">
              <Target size={12} />
              Görev {currentMission.level}
            </span>
            <span className="text-xs text-emerald-400 font-mono">+${formatNumber(currentMission.reward)}</span>
          </div>
          
          <p className="text-sm font-medium text-white mb-3 relative z-10">
            {currentMission.description}
          </p>

          {isMissionComplete ? (
            <button 
              onClick={onClaimMission}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 animate-pulse"
            >
              <CheckCircle size={16} />
              ÖDÜLÜ AL
            </button>
          ) : (
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-500"
                style={{ width: `${getMissionProgress()}%` }}
              ></div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 text-center text-slate-500 text-sm">
          Tüm görevler tamamlandı!
        </div>
      )}

      {/* Main Stats */}
      <div className="space-y-4">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Nakit</div>
          <div className="text-3xl font-bold text-emerald-400 font-mono flex items-center gap-1">
            <DollarSign size={24} />
            {formatNumber(Math.floor(gameState.money))}
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Saniye Başına Gelir</div>
          <div className="text-xl font-bold text-blue-400 font-mono flex items-center gap-2">
            <Zap size={18} />
            ${formatNumber(incomePerSecond)} / sn
          </div>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="space-y-2">
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Varlıklar</h3>
        
        <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Building2 size={18} /></div>
            <span className="text-sm font-medium">İş Yerleri</span>
          </div>
          <span className="font-mono font-bold">{countByType(ItemType.BUSINESS)}</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg"><Car size={18} /></div>
            <span className="text-sm font-medium">Arabalar</span>
          </div>
          <span className="font-mono font-bold">{countByType(ItemType.CAR)}</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Map size={18} /></div>
            <span className="text-sm font-medium">Mülkler/Adalar</span>
          </div>
          <span className="font-mono font-bold">{countByType(ItemType.HOUSE) + countByType(ItemType.ISLAND)}</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg"><Gem size={18} /></div>
            <span className="text-sm font-medium">Koleksiyon</span>
          </div>
          <span className="font-mono font-bold">{countByType(ItemType.COLLECTIBLE)}</span>
        </div>
      </div>
    </div>
  );
};