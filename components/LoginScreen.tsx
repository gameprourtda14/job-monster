import React, { useState } from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';

interface LoginScreenProps {
  onStart: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onStart }) => {
  const [inputName, setInputName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      onStart(inputName.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-4">
      <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/20">
            <TrendingUp size={48} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          İş Canavarı
        </h1>
        <p className="text-slate-400 mb-8">
          Elon Musk'ı geçmeye hazır mısın? İmparatorluğunu kur.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Girişimci Adı Giriniz"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600 text-lg"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              autoFocus
            />
          </div>
          
          <button
            type="button" 
            onClick={handleSubmit}
            disabled={!inputName.trim()}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Briefcase size={20} />
            İşe Başla
          </button>
        </form>

        <div className="mt-6 text-xs text-slate-500">
          İpucu: Bazı özel isimler ekstra sermaye ile başlar. (Örn: "Elon")
        </div>
      </div>
    </div>
  );
};