
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WatchCatalog from './components/WatchCatalog';
import WatchConsultant from './components/WatchConsultant';
import Checkout from './components/Checkout';
import AboutUs from './components/AboutUs';
import { ToolType, WatchModel, CartItem } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.CATALOG);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (watch: WatchModel) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === watch.id);
      if (existing) {
        return prev.map(i => i.id === watch.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...watch, quantity: 1 }];
    });
    alert(`${watch.name} adicionado ao arsenal.`);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderTool = () => {
    switch (activeTool) {
      case ToolType.CATALOG:
        return <WatchCatalog addToCart={addToCart} />;
      case ToolType.CONSULTANT:
        return <WatchConsultant />;
      case ToolType.CHECKOUT:
        return <Checkout cart={cart} setCart={setCart} />;
      case ToolType.ABOUT:
        return <AboutUs />;
      default:
        return <WatchCatalog addToCart={addToCart} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} cartCount={cartCount} />
      
      <main className="flex-1 md:ml-64 p-4 md:p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-16 py-4 border-b border-white/10">
          <div className="flex items-center gap-6">
            <h1 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] italic">ARC_PIRATE_HQ // V3.1</h1>
            <div className="h-4 w-[1px] bg-white/20" />
            <span className="text-[10px] font-medium text-white uppercase tracking-[0.2em] animate-pulse">
              CONNECTION_SECURED
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <div className="px-4 py-1.5 border border-white/20 text-[8px] font-bold text-gray-500 uppercase tracking-[0.3em]">
              Sessão: {Math.random().toString(16).substring(2, 8).toUpperCase()}
            </div>
          </div>
        </header>

        {renderTool()}
      </main>

      {/* Pirate/Hacker Accents */}
      <div className="fixed top-0 right-0 p-10 opacity-5 pointer-events-none -z-10 scale-[5]">
        <span className="text-9xl">🏴‍☠️</span>
      </div>
    </div>
  );
};

export default App;
