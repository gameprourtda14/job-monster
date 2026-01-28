import React, { useState, useMemo, useEffect } from 'react';
import { ShopItem, ItemType } from '../types';
import { Building2, Car, Home, Gem, Trophy, Briefcase, Lock, Cpu } from 'lucide-react';

interface ShopPanelProps {
  items: ShopItem[];
  money: number;
  onBuy: (itemId: string) => void;
}

export const ShopPanel: React.FC<ShopPanelProps> = ({ items, money, onBuy }) => {
  const [activeTab, setActiveTab] = useState<string>('SECTORS');

  const formatCost = (num: number) => {
    if (num >= 1000000000000) return (num / 1000000000000).toFixed(1) + ' T';
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + ' Mr';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + ' M';
    if (num >= 1000) return (num / 1000).toFixed(1) + ' K';
    return num.toString();
  };

  const getCost = (item: ShopItem) => {
    return Math.floor(item.baseCost * Math.pow(1.15, item.owned));
  };

  // Helper to check if player owns the parent sector
  const ownsParent = (parentId?: string) => {
    if (!parentId) return true;
    const parent = items.find(i => i.id === parentId);
    return parent && parent.owned > 0;
  };

  // Define Tabs based on Sectors
  const tabs = [
    { id: 'SECTORS', label: 'Sektörler', icon: <Briefcase size={16} />, locked: false },
    { id: 'sector_sports', label: 'Spor', icon: <Trophy size={16} />, locked: !ownsParent('sector_sports') },
    { id: 'sector_auto', label: 'Galeri', icon: <Car size={16} />, locked: !ownsParent('sector_auto') },
    { id: 'sector_realestate', label: 'Emlak', icon: <Home size={16} />, locked: !ownsParent('sector_realestate') },
    { id: 'sector_tech', label: 'Teknoloji', icon: <Cpu size={16} />, locked: !ownsParent('sector_tech') },
    { id: 'sector_collection', label: 'Koleksiyon', icon: <Gem size={16} />, locked: !ownsParent('sector_collection') },
  ];

  // Filter items based on active tab
  const filteredItems = useMemo(() => {
    if (activeTab === 'SECTORS') {
      return items.filter(i => i.type === ItemType.SECTOR);
    }
    return items.filter(i => i.parentId === activeTab).sort((a, b) => getCost(a) - getCost(b));
  }, [items, activeTab]);

  return (
    <div className="bg-slate-900 border-l border-slate-800 w-full lg:w-96 h-auto lg:h-screen flex flex-col shrink-0">
      <div className="p-4 bg-slate-950 border-b border-slate-800">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Building2 size={20} className="text-emerald-500" />
          Yatırım Fırsatları
        </h3>
        <p className="text-xs text-slate-400">Lisans al, alt sektörlere hükmet.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-950 p-1 gap-1 overflow-x-auto no-scrollbar border-b border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => !tab.locked && setActiveTab(tab.id)}
            disabled={tab.locked}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-md'
                : tab.locked
                  ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            title={tab.locked ? "Önce Lisans Satın Almalısın" : ""}
          >
            {tab.locked ? <Lock size={14} /> : tab.icon}
            {!tab.locked && <span className="hidden sm:inline">{tab.label}</span>}
          </button>
        ))}
      </div>

      {/* Item List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900">
        
        {filteredItems.map(item => {
          const cost = getCost(item);
          const canAfford = money >= cost;
          const isMaxed = item.isUnique && item.owned > 0;

          return (
            <div 
              key={item.id}
              className={`relative p-4 rounded-xl border transition-all duration-200 group ${
                isMaxed 
                  ? 'bg-slate-800/40 border-emerald-500/30 opacity-60'
                  : canAfford 
                    ? 'bg-slate-800 border-slate-700 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/20 cursor-pointer' 
                    : 'bg-slate-800/60 border-slate-800 opacity-60'
              }`}
              onClick={() => !isMaxed && canAfford && onBuy(item.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-200">{item.name}</h4>
                  <p className="text-xs text-slate-500 leading-tight mt-1">{item.description}</p>
                </div>
                <div className="text-xs font-mono px-2 py-1 bg-slate-950 rounded text-slate-400 shrink-0">
                  {item.owned > 0 ? `x${item.owned}` : '0'}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 gap-2">
                <div className="flex items-center gap-1 text-xs">
                  {item.incomePerSecond > 0 ? (
                     <span className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">+{formatCost(item.incomePerSecond)}/sn</span>
                  ) : (
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">LİSANS</span>
                  )}
                </div>

                <button
                  disabled={!canAfford || isMaxed}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors shrink-0 min-w-[80px] justify-center ${
                    isMaxed
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : canAfford
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {isMaxed ? (
                    'ALINDI'
                  ) : (
                    <>
                      <span className="text-xs opacity-75">$</span>
                      {formatCost(cost)}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
        
        {filteredItems.length === 0 && (
          <div className="text-center text-slate-500 py-10 flex flex-col items-center gap-2">
            <Lock size={32} />
            <p>Bu sektöre erişmek için önce lisansını satın almalısın.</p>
          </div>
        )}
      </div>
    </div>
  );
};