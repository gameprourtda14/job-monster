import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_ITEMS, MISSIONS } from './constants';
import { GameState } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { ClickArea } from './components/ClickArea';
import { ShopPanel } from './components/ShopPanel';
import { SettingsModal } from './components/SettingsModal';
import { LeaderboardModal } from './components/LeaderboardModal';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  // Initialize Game Logic
  const startGame = (username: string) => {
    // Easter Egg: Bonus for "Elon"
    const startMoney = username.toLowerCase().includes('elon') ? 1000000 : 0;
    
    setGameState({
      username,
      money: startMoney,
      totalEarnings: startMoney,
      level: 1,
      startTime: Date.now(),
      inventory: {},
      items: INITIAL_ITEMS.map(item => ({ ...item, owned: 0 })),
      missions: MISSIONS.map(m => ({...m})),
      settings: {
        soundEnabled: true,
        graphicsHigh: true
      }
    });
  };

  // Helper Calculations
  const calculateIncomePerSecond = useCallback(() => {
    if (!gameState) return 0;
    return gameState.items.reduce((total, item) => {
      return total + (item.incomePerSecond * item.owned);
    }, 0);
  }, [gameState]);

  // Click Value is now fixed for the early game "Manual Work" phase
  const calculateClickValue = useCallback(() => {
    return 10; // Fixed value for manual labor
  }, []);

  // Game Loop (Passive Income)
  useEffect(() => {
    if (!gameState) return;

    const income = calculateIncomePerSecond();
    if (income === 0) return;

    const interval = setInterval(() => {
      setGameState(prev => {
        if (!prev) return null;
        const newMoney = prev.money + income;
        const newTotal = prev.totalEarnings + income;
        
        // Level up logic based on total earnings
        const nextLevel = Math.floor(Math.sqrt(newTotal / 5000)) + 1;
        
        return {
          ...prev,
          money: newMoney,
          totalEarnings: newTotal,
          level: Math.max(prev.level, nextLevel)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, calculateIncomePerSecond]);

  // Audio Helper
  const playSound = (type: 'click' | 'buy') => {
    if (gameState?.settings.soundEnabled) {
      // Mock sound effect
    }
  };

  // Interactions
  const handleMainClick = () => {
    if (!gameState) return;
    
    // Only allow clicking if income is 0 (Manual Labor Phase)
    if (calculateIncomePerSecond() > 0) return;

    const value = calculateClickValue();
    playSound('click');
    
    setGameState(prev => {
      if (!prev) return null;
      const newMoney = prev.money + value;
      const newTotal = prev.totalEarnings + value;
      
      return {
        ...prev,
        money: newMoney,
        totalEarnings: newTotal
      };
    });
  };

  const handleBuyItem = (itemId: string) => {
    if (!gameState) return;
    
    const itemIndex = gameState.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    const item = gameState.items[itemIndex];
    
    // Check strict dependency (Sector ownership)
    if (item.parentId) {
      const parent = gameState.items.find(i => i.id === item.parentId);
      if (!parent || parent.owned <= 0) return; // Cannot buy without license
    }

    const cost = Math.floor(item.baseCost * Math.pow(1.15, item.owned));

    if (gameState.money >= cost) {
      if (item.isUnique && item.owned > 0) return;
      playSound('buy');

      const newItems = [...gameState.items];
      newItems[itemIndex] = { ...item, owned: item.owned + 1 };

      setGameState(prev => {
        if (!prev) return null;
        return {
          ...prev,
          money: prev.money - cost,
          items: newItems
        };
      });
    }
  };

  const handleClaimMission = () => {
    if (!gameState) return;
    const currentMission = gameState.missions.find(m => m.level === gameState.level && !m.isClaimed); 
    
    if (currentMission) {
      setGameState(prev => {
        if (!prev) return null;
        
        let complete = false;
        if (currentMission.type === 'MONEY' && prev.money >= currentMission.target) complete = true;
        if (currentMission.type === 'OWNED_TOTAL') {
          const total = prev.items.reduce((acc, i) => acc + i.owned, 0);
          if (total >= currentMission.target) complete = true;
        }
        if (currentMission.type === 'CLICK_POWER' && calculateIncomePerSecond() >= currentMission.target) complete = true;

        if (!complete) return prev;

        const updatedMissions = prev.missions.map(m => 
          m.level === currentMission.level ? { ...m, isClaimed: true } : m
        );

        return {
          ...prev,
          money: prev.money + currentMission.reward,
          missions: updatedMissions
        };
      });
    }
  };

  // Settings Handlers
  const handleToggleSound = () => {
    setGameState(prev => prev ? ({ ...prev, settings: { ...prev.settings, soundEnabled: !prev.settings.soundEnabled } }) : null);
  };

  const handleToggleGraphics = () => {
    setGameState(prev => prev ? ({ ...prev, settings: { ...prev.settings, graphicsHigh: !prev.settings.graphicsHigh } }) : null);
  };

  const handleResetGame = () => {
    setGameState(null);
    setIsSettingsOpen(false);
  };

  const handleSaveGame = () => {
    if (gameState) {
      localStorage.setItem('business_monster_save', JSON.stringify(gameState));
      alert('Oyun kaydedildi!');
    }
  };

  const handleLoadGame = () => {
    const saved = localStorage.getItem('business_monster_save');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
        setIsSettingsOpen(false);
        alert('Oyun yüklendi!');
      } catch (e) {
        alert('Kayıt dosyası bozuk.');
      }
    } else {
      alert('Kayıtlı oyun bulunamadı.');
    }
  };

  if (!gameState) {
    return <LoginScreen onStart={startGame} />;
  }

  const activeMission = gameState.missions.find(m => !m.isClaimed && m.level <= gameState.level);
  const income = calculateIncomePerSecond();

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Dashboard 
        gameState={gameState} 
        incomePerSecond={income} 
        currentMission={activeMission}
        onClaimMission={handleClaimMission}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />
      
      <ClickArea 
        onMainClick={handleMainClick} 
        clickValue={calculateClickValue()} 
        graphicsHigh={gameState.settings.graphicsHigh}
        incomePerSecond={income}
      />
      
      <ShopPanel 
        items={gameState.items} 
        money={gameState.money} 
        onBuy={handleBuyItem} 
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={gameState.settings}
        onToggleSound={handleToggleSound}
        onToggleGraphics={handleToggleGraphics}
        onResetGame={handleResetGame}
        onSaveGame={handleSaveGame}
        onLoadGame={handleLoadGame}
        onOpenLeaderboard={() => {
          setIsSettingsOpen(false);
          setIsLeaderboardOpen(true);
        }}
      />

      <LeaderboardModal 
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        playerMoney={gameState.money}
        playerName={gameState.username}
      />
    </div>
  );
};

export default App;