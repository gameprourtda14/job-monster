import React from 'react';
import { X, Volume2, VolumeX, Monitor, MonitorOff, RotateCcw, Save, Upload, Trophy } from 'lucide-react';
import { GameSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onToggleSound: () => void;
  onToggleGraphics: () => void;
  onResetGame: () => void;
  onSaveGame: () => void;
  onLoadGame: () => void;
  onOpenLeaderboard: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onToggleSound,
  onToggleGraphics,
  onResetGame,
  onSaveGame,
  onLoadGame,
  onOpenLeaderboard
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Oyun Ayarları</h2>

        <div className="space-y-3">
          {/* Leaderboard Button */}
          <button
            onClick={onOpenLeaderboard}
            className="w-full p-4 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white flex items-center justify-center gap-2 font-bold shadow-lg"
          >
            <Trophy size={20} />
            Dünya Sıralaması
          </button>

          <hr className="border-slate-800 my-2" />

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`w-full p-4 rounded-xl flex items-center justify-between border transition-all ${
              settings.soundEnabled 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
              <span className="font-bold">Ses Efektleri</span>
            </div>
            <span className="text-sm font-mono">{settings.soundEnabled ? 'AÇIK' : 'KAPALI'}</span>
          </button>

          {/* Graphics Toggle */}
          <button
            onClick={onToggleGraphics}
            className={`w-full p-4 rounded-xl flex items-center justify-between border transition-all ${
              settings.graphicsHigh 
                ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {settings.graphicsHigh ? <Monitor size={24} /> : <MonitorOff size={24} />}
              <span className="font-bold">Grafik Kalitesi</span>
            </div>
            <div className="text-right">
              <span className="block text-sm font-mono">{settings.graphicsHigh ? 'YÜKSEK' : 'DÜŞÜK'}</span>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              onClick={onSaveGame}
              className="p-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-emerald-400 flex flex-col items-center justify-center gap-1"
            >
              <Save size={20} />
              <span className="text-xs font-bold">KAYDET</span>
            </button>
             <button
              onClick={onLoadGame}
              className="p-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-blue-400 flex flex-col items-center justify-center gap-1"
            >
              <Upload size={20} />
              <span className="text-xs font-bold">YÜKLE</span>
            </button>
          </div>

          <hr className="border-slate-800 my-4" />

          {/* Reset Button */}
          <button
            onClick={() => {
              if (window.confirm('Tüm ilerlemen silinecek! Emin misin?')) {
                onResetGame();
              }
            }}
            className="w-full p-3 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 font-bold text-sm"
          >
            <RotateCcw size={18} />
            Oyunu Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
};