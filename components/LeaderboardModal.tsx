import React from 'react';
import { X, Trophy, Medal } from 'lucide-react';
import { BILLIONAIRES } from '../constants';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerMoney: number;
  playerName: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  playerMoney,
  playerName
}) => {
  if (!isOpen) return null;

  const formatMoney = (num: number) => {
    if (num >= 1000000000000) return '$' + (num / 1000000000000).toFixed(2) + ' Trilyon';
    if (num >= 1000000000) return '$' + (num / 1000000000).toFixed(2) + ' Milyar';
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(2) + ' Milyon';
    return '$' + new Intl.NumberFormat('tr-TR').format(num);
  };

  // Merge player into the list for display
  const combinedList = [...BILLIONAIRES, { rank: 999, name: playerName, worth: playerMoney }]
    .sort((a, b) => b.worth - a.worth)
    .map((item, index) => ({ ...item, displayRank: index + 1 }));

  // Find player's new rank
  const playerRank = combinedList.findIndex(p => p.name === playerName) + 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-2 text-yellow-500">
            <Trophy size={24} />
            <h2 className="text-xl font-bold">Dünya Sıralaması</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 bg-emerald-900/20 border-b border-emerald-500/20 text-center">
          <div className="text-sm text-emerald-400">Senin Sıralaman</div>
          <div className="text-3xl font-bold text-white">#{playerRank}</div>
          <div className="text-sm text-slate-400 mt-1">Servet: {formatMoney(playerMoney)}</div>
        </div>

        <div className="overflow-y-auto p-2 space-y-2 flex-1">
          {combinedList.slice(0, 50).map((person) => {
            const isPlayer = person.name === playerName;
            return (
              <div 
                key={person.name}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isPlayer 
                    ? 'bg-emerald-600 text-white shadow-lg scale-[1.02] border border-emerald-400' 
                    : 'bg-slate-800/50 text-slate-300 border border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`font-mono font-bold w-8 text-center ${
                    person.displayRank === 1 ? 'text-yellow-400 text-lg' :
                    person.displayRank === 2 ? 'text-slate-300' :
                    person.displayRank === 3 ? 'text-amber-600' : 'opacity-50'
                  }`}>
                    {person.displayRank}
                  </div>
                  <div className="font-semibold truncate max-w-[150px]">
                    {person.name} {isPlayer && '(Sen)'}
                  </div>
                </div>
                <div className="font-mono text-sm">
                  {formatMoney(person.worth)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
